import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { SAFETY_JSON } from "@utils/parse";
import { delay, generateKey } from "@utils/utils";
import { socket } from "@services/socket";
import { useInteraction } from "@services/interaction/interaction.hook";


import { IFile, IMessage, ISocketEvent, MessageContentType, MessageRole, MessageType } from "./chat.type";
import { useChatStatus, useMessages } from "./chat.hook";
import { ChatContext } from "./chat.context";
import { useInteractionClient } from "@services/interaction/interaction.client";
import { addDays } from "date-fns";
import { useAttachmentClient } from "@services/attachment/attachment.client";
import { AttachmentType, IAttachment } from "@services/attachment/attachment.types";
import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { convertAttachmentTypeToMessageType } from "./chat.cte";



interface Props {
    children: ReactNode;
}

export function ChatProvider({ children }: Props) {

    const toast = useToast();

    const { session, initialMessages, hideBrowserHeader, handleChatRefetch, refetchSession } = useInteraction();

    const { update } = useInteractionClient();
    const { upload } = useAttachmentClient();

    const { data, refetch } = useMessages(session);
    const { data: seenAt, refetch: refetchStatus } = useChatStatus();


    const didDelayedAnimation = useRef(false);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [showInput, setShowInput] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hasAgent = !!messages.find(m => m.role === MessageRole.AGENT);


    const delayedMessages = useCallback(async (value: IMessage[]) => {
        const isFirstInteraction = !value.find((m: IMessage) => m.role === MessageRole.USER);
        hideBrowserHeader();
        let newList = [];
        setMessages([]);
        setIsLoading(false);
        setIsTyping(true);
        if (!!value) {
            let sorted = value.sort((a, b) => a.sentAt - b.sentAt);
            if (isFirstInteraction && !didDelayedAnimation.current) {
                for (let index = 0; index < sorted.length; index++) {
                    await delay(0.75);
                    setIsTyping(true);
                    newList.push(value[index])
                    await delay(1);
                    setIsTyping(false);
                    setMessages(newList);
                }
                didDelayedAnimation.current = true;
            } else {
                for (let index = 0; index < sorted.length; index++) {
                    newList.push(value[index])
                }
            }
        }
        setMessages(newList);
        setIsTyping(false);
    }, []);

    useEffect(() => {
        delayedMessages(data ?? initialMessages);
    }, [data]);


    useEffect(() => {
        socket.on(session, async (content: string) => {
            const data = SAFETY_JSON.parse<ISocketEvent>(content);
            // console.log('interaction-event', data);
            if (!!data) {
                if (data.event === 'MESSAGE' && (!data.role || data.role !== MessageRole.USER)) {

                    await Promise.all([handleChatRefetch(), refetch(), refetchStatus()])
                }

                if (data.event === 'CLOSED') {
                    await Promise.all([handleChatRefetch(), refetch(), refetchStatus(), refetchSession()])
                    setShowInput(false);
                }

                if (data.event === 'STAND_BY') {
                    await Promise.all([handleChatRefetch(), refetch(), refetchStatus(), refetchSession()])
                }

                if (data.event === 'RETAKE') {
                    await Promise.all([handleChatRefetch(), refetch(), refetchStatus(), refetchSession()])
                }

                if (data.event === 'PROCESSING') {
                    setIsTyping(true);
                }


                if (data.event === 'PROCESSED') {
                    setIsTyping(false);
                }

            }

        });

    }, [socket]);


    function onInputFocus() {
        setIsInputFocused(true);
    }

    function onInputLeave() {
        setIsInputFocused(false);
    }

    async function onMessageSent(question: string, attachment: IFile | null) {

        setIsTyping(true);
        try {
            let newList = messages;

            let contentType: MessageContentType = MessageContentType.TEXT;
            let mimeType = 'text/plain';
            let uuid = generateKey();
            let media: IAttachment | null = null;

            if (!!attachment) {
                media = {
                    uuid: uuid,
                    originalName: attachment.name,
                    mimeType: attachment.type,
                    extension: attachment.name.split('.')[1],
                    type: AttachmentType.IMAGE,
                    size: attachment.size,
                    url: attachment.src,
                    urlExpiration: addDays(new Date(), 2).getTime()
                }
                contentType = convertAttachmentTypeToMessageType[media.type];
                mimeType = attachment.type;
            }

            newList.push({
                role: MessageRole.USER,
                type: MessageType.INPUT,
                content: question,
                createdAt: new Date().getTime(),
                sentAt: new Date().getTime(),
                uuid: uuid,
                agent: null,
                contentType: contentType,
                mimeType: mimeType,
                media: media,
                status: 'WAITING'
            });
            setMessages(newList);
            hideBrowserHeader();
            await delay(0.5);
            setIsTyping(true);
            if (!!attachment) {
                media = await upload(attachment)
                    .then(response => {

                        return response.data;
                    })
                    .catch((err: AxiosError<any>) => {

                        toast({
                            status: 'error',
                            title: 'Mídia inválida!',
                            description: err.response?.data.message,
                            isClosable: true,
                            duration: 5000,
                            position: 'bottom'
                        });
                        setMessages(newList.filter(m => m.uuid !== uuid));
                        setIsTyping(false);
                        throw new Error(err.response?.data.message)
                    });
            }
            await update(question, media ?? null)
                .then(async (response: AxiosResponse<{status: string}>) => {
                    await refetch();
                    setMessages(!!data ? data : []);
                    setShowInput(response.data.status.toLowerCase() === 'success');
                    setIsTyping(false);
                    onInputFocus();
                })
                .catch(async () => {
                    await refetch();
                    setIsTyping(false);
                    onInputFocus();
                });
            refetchStatus();
        } catch (err) {
            setIsTyping(false);
        }
    }


    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            isTyping: isTyping,
            isInputFocused: isInputFocused,
            onMessageSent,
            onInputFocus,
            onInputLeave,
            showInput,
            isLoadingMessages: isLoading,
            seenAt: seenAt ?? null,
            hasAgent,
            isFocused,
            setIsFocused,
            hasUserMessage: !!messages && messages.length > 0 && messages.filter(i => i.role === MessageRole.USER).length > 0
        }}>
            {children}
        </ChatContext.Provider>
    );
}