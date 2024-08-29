import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

import { IFile, InputType } from "@services/chat/chat.type";
import { useCurrentBot } from "@services/bot/bot.hook";
import { useChat } from "@services/chat/chat.hook";

import { ChatFormContext } from "./context.form";


interface Props {
    children: ReactNode;
}


export function ChatFormProvider({ children }: Props) {


    const { bot } = useCurrentBot();
    const { onMessageSent } = useChat();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showAttachment, setShowAttachment] = useState(true);
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<IFile | null>(null);
    const [inputType, setInputType] = useState<InputType>(InputType.TEXT);

    const textInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const error = useRef<string | null>(null);


    useEffect(() => {
        setShowAttachment(true);
        if (!!message && message.length > 2) {
            error.current = null;
            setIsError(false);
            setShowAttachment(false);
        }
    }, [message]);

    async function handleSubmit(event: FormEvent) {
        event?.preventDefault();
        setIsSubmitting(true);
        setIsError(false);
        let err = null;
        if (!message || message.length < 2) {
            err = 'Por favor, digite sua pergunta';
            if (!attachment) {
                err = 'Por favor, digite algo sobre a mídia'
            }
            setMessage('');
            setIsError(true);
        } else if (!!bot.config.maxChars && message.length > bot.config.maxChars) {
            err = 'Por favor, simplifique sua pergunta';
            setIsError(true);
        } else {
            const value = message;
            const attach = attachment;
            setMessage('');
            setAttachment(null);
            setInputType(InputType.TEXT);
            await onMessageSent(value, attach);

        }
        error.current = err;
        setIsSubmitting(false);
    }

    function toggleInputType(type: InputType) {
        setInputType(type);
        setMessage('');
        setAttachment(null);
        setIsError(false);
    }

    function handleAttachmentClick(type: InputType) {
        setInputType(type);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.accept = type === InputType.IMAGE ? 'image/*' : 'application/pdf'
        }
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = event.target.files?.[0];
        setAttachment(null);
        if (file) {
            let attach: IFile = {
                name: file.name,
                size: file.size,
                type: file.type,
                content: file,
                src: ''
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                attach.src = reader.result as string;
                setAttachment(attach);
            };
            reader.readAsDataURL(file);
            setShowAttachment(false);
        }
    };


    function handleResetAttachment() {
        setAttachment(null);
        setShowAttachment(true);
    }

    return (
        <ChatFormContext.Provider value={{
            isSubmitting,
            isDisabled,
            isError,
            textInputRef,
            fileInputRef,
            message,
            setMessage,
            inputType,
            toggleInputType,
            handleAttachmentClick,
            handleFileChange,
            attachment,
            showAttachment: showAttachment && (!attachment || attachment.src.length === 0),
            handleResetAttachment,
            handleSubmit,
            error: !!error.current ? error.current : null,
            hasPreview: !!attachment && attachment.src.startsWith('data')
        }}
        >
            {children}
        </ChatFormContext.Provider>
    );
}