import { IChatLayoutProps } from "@conversu/chat/dist/@types/layout";


export interface IBot {
    uuid: string;
    alias: string;
    layout: IChatLayoutProps;
}