export interface IBot {
    uuid: string;
    alias: string;
    layout: IChatLayoutProps;
    tooltip?: string;
}


export interface IChatLayoutPalette {
    bg: string;
    color: string;
}

export type IChatLayoutProps = {
    user: IChatLayoutPalette;
    bot: IChatLayoutPalette;
    agent: IChatLayoutPalette;
    title?: {
        font: string;
        color: string;
    }
    colors: {
        primary: string;
        secondary: string;
    }
}