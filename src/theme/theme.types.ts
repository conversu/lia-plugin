

export type IBotLayoutProps = {
    user: {
        bg: string;
        color: string;
    };
    bot: {
        bg: string;
        color: string;
    };
    agent: {
        bg: string;
        color: string;
    };
    title?: {
        font: string;
        color: string;
    }
    colors: {
        primary: string;
        secondary: string;
    }
}