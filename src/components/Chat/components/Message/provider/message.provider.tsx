import { IMessage, IMessageStyleType, MessageRole } from "@services/chat/chat.type";
import { ReactNode } from "react";
import { isBefore } from "date-fns";

import { useCurrentBot } from "@services/bot/bot.hook";
import { useChat } from "@services/chat/chat.hook";

import { MessageContext } from "./message.context";


interface Props {
    message: IMessage;
    withIcon?: boolean;
    isLastMessage?: boolean;
    isError?: boolean;
    children: ReactNode;
}


export default function MessageProvider({
    message,
    isError = false,
    isLastMessage = false,
    withIcon = true,
    children
}: Props) {

    const { style } = useCurrentBot();
    const { seenAt } = useChat();

    const { role, sentAt } = message;

    const theme = style[role.toLowerCase() as keyof IMessageStyleType];

    return (
        <MessageContext.Provider value={{
            message,
            isAssistant: role === MessageRole.BOT || role === MessageRole.AGENT,
            isSeen: !seenAt || isBefore(new Date(sentAt), new Date(seenAt)),
            theme: theme,
            color: isError ? 'red.500' : theme?.color,
            bg: theme.bg,
            isError: isError,
            error: {
                color: 'red.500'
            },
            withIcon: withIcon,
            isLastMessage: isLastMessage,
            role: message.role,
            agent: message.agent,
            style: style
        }}
        >
            {children}
        </MessageContext.Provider>
    );
}