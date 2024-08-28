import { ReactNode, useEffect } from "react";
import { ParentContext } from "./context";


interface Props {
    children: ReactNode;
}


export default function ParentProvider({ children }: Props) {

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            // Add security check: Ensure the event is from the correct iframe
            // if (event.origin !== 'https://expected-origin.com') {
            //     console.warn('Ignored message from unexpected origin:', event.origin);
            //     return;
            // }

            // Handle the event and update context state
            console.log(event.data);
        };

        window.addEventListener('message', handleIframeMessage);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleIframeMessage);
        };
    }, []);

    return (
        <ParentContext.Provider value={{}}>
            {children}
        </ParentContext.Provider>
    );
}