import { MessageContentType } from "./chat.type";



export const convertAttachmentTypeToMessageType = {
    AUDIO: MessageContentType.AUDIO,
    DOCUMENT: MessageContentType.DOCUMENT,
    IMAGE: MessageContentType.IMAGE,
    OTHER: MessageContentType.TEXT
}