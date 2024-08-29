import { Avatar } from "@chakra-ui/react";

import { ChatProvider } from "@services/chat/chat.provider";

import { ChatContainer } from "./components/Container";
import { ChatHeader } from "./components/Header";
import { ChatContent } from "./components/Content";
import { ChatHead } from "./components/Head";
import { Footer } from "./components/Footer";

import { ChatMessages } from "./components/Messages";
import { ChatFormProvider } from "./components/form/provider/provider.form";
import { ChatFormContainer } from "./components/form/components/container.form";
import { ChatFormSubmitButton } from "./components/form/components/btn-submit.form";
import { AttachmentButton } from "./components/form/components/btn-attachment.form";
import { ChatFormInputContainer } from "./components/form/components/input-container.form";
import { ChatFormInputGroup } from "./components/form/components/input-group.form";
import { InputText } from "./components/form/components/input-text.form";
import { ChatFormInputFile } from "./components/form/components/input-file.form";
import { InputFilePreview } from "./components/form/components/input-file-preview.form";




export const Chat = {
    Avatar: Avatar,
    Footer: Footer,
    Header: ChatHeader,
    Messages: ChatMessages,
    Content: ChatContent,
    Container: ChatContainer,
    Provider: ChatProvider,
    Head: ChatHead,
}

export const ChatForm = {
    Provider: ChatFormProvider,
    Container: ChatFormContainer,
    Button: {
        Submit: ChatFormSubmitButton,
        Attachments: AttachmentButton
    },
    Input: {
        Container: ChatFormInputContainer,
        Group: ChatFormInputGroup,
        Text: InputText,
        File: {
            Container: ChatFormInputFile,
            Preview: InputFilePreview
        }
    }
}