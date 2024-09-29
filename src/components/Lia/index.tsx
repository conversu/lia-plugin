import { IBot } from "../../@types/bot";
import { useTheme } from "../../theme/theme.hook";
import { usePlugin } from "../../services/plugin/hook";
import { useEffect } from "react";


interface Props {
    allowDarkTheme: boolean;
    bot: IBot;
    src: string;
    user?: string;
}

export function Lia({
    allowDarkTheme,
    bot,
    src,
    user
}: Props) {

    const { borderRadius } = usePlugin();
    const { isDarkTheme } = useTheme();

    const params = {
        'type': 'plugin',
        'theme': isDarkTheme && allowDarkTheme ? 'dark' : 'light',
        'allow-toggle': allowDarkTheme,
        'origin': btoa(window.location.origin),
        'username': btoa(user ?? 'unknown')
    };


    // useEffect(() => {
    //     const handleMessage = (event: any) => {
    //       // Validate the origin of the message
    //       console.debug('-----------------')
    //       console.debug(event)
    //       if (event.origin !== src) {
    //         return; // Ignore the message if it's from an untrusted domain
    //       }

    //       // Access the data sent from the iframe
    //       const receivedData = event.data;
    //       console.debug("Message received from iframe:", receivedData);

    //       // Perform actions based on the received message
    //       // e.g., updating state, triggering side effects, etc.
    //     };

    //     // Add the event listener
    //     window.addEventListener("message", handleMessage);

    //     // Clean up the event listener on component unmount
    //     return () => {
    //       window.removeEventListener("message", handleMessage);
    //     };
    //   }, [src]);

    useEffect(() => {
        const iframe = document.getElementById("your-iframe-id");

        const disableScroll = () => {
            document.body.style.overflow = "hidden";
        };

        const enableScroll = () => {
            document.body.style.overflow = "auto";
        };

        iframe?.addEventListener("mouseenter", disableScroll);
        iframe?.addEventListener("mouseleave", enableScroll);

        // Clean up event listeners on component unmount
        return () => {
            iframe?.removeEventListener("mouseenter", disableScroll);
            iframe?.removeEventListener("mouseleave", enableScroll);
        };
    }, [])


    return (
        <iframe
            src={new URL(`${src}/${bot.alias}?${Object.entries(params).map(e => e.join('=')).join('&')}`).toString()}
            id={bot.uuid}
            title='conversu-plugin'
            width='100%'
            height='100%'
            style={{
                border: 'none',
                borderRadius: borderRadius as string,
                pointerEvents: 'auto'
            }}
        />
    )
}