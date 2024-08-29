import { ReactNode } from "react";

import { MessageContentType } from "@services/chat/chat.type";

import { useMessageContext } from "../provider/message.hook";
import MessageContent from "./content.message";
import MessageTextContent from "./text.message";




interface Props {
    children?: ReactNode;
}


export default function TextMessage({ children }: Props) {

    const {
        message,
    } = useMessageContext();

    if (message.contentType !== MessageContentType.TEXT) {

        return (<></>);
    }

    return (
        <MessageContent>
            <MessageTextContent />
            {children}
        </MessageContent>
    );
}