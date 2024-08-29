import { createContext } from "react";
import { IFile, IMessage } from "./chat.type";


export interface ChatContextData {
    isTyping: boolean;
    isLoadingMessages: boolean;
    isInputFocused: boolean;
    onInputFocus: () => void;
    onInputLeave: () => void;
    isFocused: boolean;
    setIsFocused: (value: boolean) => void;
    showInput: boolean;
    messages: IMessage[];
    seenAt: number | null;
    setMessages: (messages: IMessage[]) => void;
    onMessageSent: (question: string, attachment: IFile | null) => Promise<void>;
    hasAgent: boolean;
    hasUserMessage: boolean;
}

export const ChatContext = createContext({} as ChatContextData);