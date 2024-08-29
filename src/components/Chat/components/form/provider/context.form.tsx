import { FormEvent, createContext } from "react";
import { IFile, InputType } from "@services/chat/chat.type";


export interface IChatFormContext {
    isSubmitting?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    textInputRef: React.MutableRefObject<HTMLInputElement | null>;
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
    message: string;
    attachment: IFile | null;
    error: string | null;
    inputType: InputType;
    showAttachment: boolean;
    setMessage: (value: string) => void;
    toggleInputType: (type: InputType) => void;
    handleAttachmentClick: (type: InputType) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetAttachment: () => void;
    handleSubmit: (event: FormEvent) => void;
    hasPreview: boolean;
    
}


export const ChatFormContext = createContext({} as IChatFormContext);