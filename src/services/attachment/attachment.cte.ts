import { MessageContentType } from "@services/chat/chat.type";



export const attachTypeToMessageType = {
    AUDIO: MessageContentType.AUDIO,
    DOCUMENT: MessageContentType.DOCUMENT,
    IMAGE: MessageContentType.IMAGE,
    OTHER: MessageContentType.DOCUMENT
}