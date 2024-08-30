import { IBot } from "../../@types/bot";
import { Chat } from "@conversu/chat";


interface Props {
    allowDarkTheme: boolean;
    bot: IBot;
    src: string;
}

export function Lia({
    allowDarkTheme,
    bot,
    src
}: Props) {

    const { isDarkTheme } = Chat.Theme.use();

    const params = {
        'type': 'plugin',
        'theme': isDarkTheme && allowDarkTheme ? 'dark' : 'light',
        'allow-toggle': allowDarkTheme,
        'origin': btoa(window.location.origin)
    };

    return (
        <iframe
            src={new URL(`${src}/${bot.alias}?${Object.entries(params).map(e => e.join('=')).join('&')}`).toString()}
            id={bot.uuid}
            title='conversu-plugin'
            width='100%'
            height='100%'
            style={{
                border: 'none',
                borderRadius: '.75rem .75rem 0rem .75rem'
            }}
        />
    )
}