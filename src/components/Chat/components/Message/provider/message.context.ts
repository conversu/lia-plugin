import { IAgent, IMessage, IMessageRole, IMessageStyleType, IStylePalette } from "@services/chat/chat.type";
import { createContext } from "react";



export interface IMessageContext {
    message: IMessage;
    isAssistant: boolean;
    isSeen: boolean;
    theme: IStylePalette;
    color: string;
    bg: string;
    isError: boolean;
    error: { color: string; }
    withIcon: boolean;
    isLastMessage: boolean;
    role: IMessageRole;
    agent: IAgent | null;
    style: IMessageStyleType;
}


export const MessageContext = createContext({} as IMessageContext);