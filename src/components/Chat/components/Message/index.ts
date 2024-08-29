import MessageAvatar from "./components/avatar.message";
import MessageContainer from "./components/container.message";
import MessageContentContainer from "./components/content-container.message";
import DocumentMessage from "./components/content-document.message";
import ImageMessage from "./components/content-image.message";
import LinkMessage from "./components/content-link.message";
import TextMessage from "./components/content-text.message";
import MessageDetail from "./components/detail.message";
import MessageStatus from "./components/status.message";
import MessageProvider from "./provider/message.provider";






export const Message ={
    Provider: MessageProvider,
    Container: MessageContainer,
    Detail: MessageDetail,
    Content: {
        Container: MessageContentContainer,
        TEXT: TextMessage,
        LINK: LinkMessage,
        IMAGE: ImageMessage,
        DOCUMENT: DocumentMessage
    },
    Avatar: MessageAvatar,
    Status: MessageStatus
}