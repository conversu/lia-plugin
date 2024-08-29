import { IAttachment } from "@services/attachment/attachment.types";


export enum MessageType {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT'
}

export type IMessageType = keyof typeof MessageType;

export enum MessageRole {
    BOT = 'BOT',
    USER = 'USER',
    AGENT = 'AGENT'
}

export type IMessageRole = keyof typeof MessageRole;


export enum MessageContentType {
    TEXT = 'TEXT',
    AUDIO = 'AUDIO',
    DOCUMENT = 'DOCUMENT',
    LINK = 'LINK',
    IMAGE = 'IMAGE'
}

export type IMessageContentType = keyof typeof MessageContentType;

export interface IAgent {
    uuid: string;
    name: string;
    nickname: string;
    logo: string;
}

export interface IMessage {
    uuid: string;
    type: IMessageType;
    role: IMessageRole;
    content: string;
    createdAt: number;
    sentAt: number;
    status?: 'SENT' | 'WAITING';
    isError?: boolean;
    agent: IAgent | null;
    contentType: IMessageContentType;
    mimeType: string;
    media: IAttachment | null;
}

export interface IStylePalette {
    bg: string;
    color: string;
}

export interface IThemePalette {
    primary: string;
    secondary: string;
}

export interface IPartnerStyle extends IMessageStyleType {
    colors: IThemePalette;
}

export interface IBotLayout extends IMessageStyleType {
    colors: IThemePalette;
    title?: {
        color: string;
        font: string;
    }
}


export interface IMessageStyleType {
    bot: IStylePalette;
    user: IStylePalette;
    agent: IStylePalette;

}

export interface ISocketEvent {
    event: 'CLOSED' | 'MESSAGE' | 'STAND_BY' | 'RETAKE' | 'PROCESSING' | 'PROCESSED';
    timestamp: number;
    role?: MessageRole;
}

export enum InputType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    DOCUMENT = 'DOCUMENT'
}


export interface IFile {
    name: string;
    size: number;
    type: string;
    src: string;
    content: File;
}