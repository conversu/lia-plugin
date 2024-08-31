import { useEffect } from "react";
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


    useEffect(() => {
        const handleMessage = (event: any) => {
          // Validate the origin of the message
          console.debug('-----------------')
          console.debug(event)
          if (event.origin !== src) {
            return; // Ignore the message if it's from an untrusted domain
          }
    
          // Access the data sent from the iframe
          const receivedData = event.data;
          console.debug("Message received from iframe:", receivedData);
    
          // Perform actions based on the received message
          // e.g., updating state, triggering side effects, etc.
        };
    
        // Add the event listener
        window.addEventListener("message", handleMessage);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener("message", handleMessage);
        };
      }, [src]);


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