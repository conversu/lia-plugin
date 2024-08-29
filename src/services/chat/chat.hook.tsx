import { useContext } from "react";
import { subMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { ChatContext } from "@services/chat/chat.context";
import { useInteraction } from "@services/interaction/interaction.hook";
import { useInteractionClient } from "@services/interaction/interaction.client";
import { generateKey } from "@utils/utils";

import { IMessage, MessageContentType, MessageRole, MessageType } from "./chat.type";


export const useChat = () => useContext(ChatContext);



export function useMessages(interaction: string) {

    const { getMessages } = useInteractionClient();

    async function get() {

        return await getMessages()
            .then(response => {

                return response.data;
            })
            .catch(() => {

                const now = new Date().getTime();
                const messages = [
                    'Ops!',
                    'Estamos passando por uma instabilidade momentânea...',
                    'Por favor, aguarde um instante ou volte mais tarde 😓'
                ];

                return messages.map(m => {
                    return {
                        uuid: generateKey(),
                        type: MessageType.OUTPUT,
                        role: MessageRole.BOT,
                        content: m,
                        createdAt: now + messages.indexOf(m),
                        sentAt: now + messages.indexOf(m),
                        isError: false,
                        agent: null,
                        contentType: MessageContentType.TEXT,
                        mimeType: 'plain/text',
                        media: null
                    }
                })
            })
    }

    return useQuery<IMessage[]>([`${interaction}-historic`], () => get(), {
        staleTime: 1000 * 60 * 2, // 30 secs
        refetchInterval: 1000 * 60 * 2,
        refetchIntervalInBackground: true,
        onError: () => { return [] },
        retry: 5
    });
}

export function useChatStatus() {

    const { session } = useInteraction();
    const { getLastSeen } = useInteractionClient();

    async function get() {

        return await getLastSeen()
            .then(response => {
                return response.data
            })
            .catch(() => {

                return null;
            })
    }

    return useQuery<number | null>([`${session}-seen-at`], () => get(), {
        staleTime: 1000 * 60, // 1 secs
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: true,
        onError: () => { return subMinutes(new Date(), 3) },
        retry: 1
    });
}
