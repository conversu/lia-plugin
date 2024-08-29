import { useChat } from "@services/chat/chat.hook";
import React from "react";
import { Message } from "./Message";


export function ChatMessages() {

    const { messages, isTyping } = useChat();

    return (
        <React.Fragment>
            {messages.sort((a, b) => a.sentAt - b.sentAt).map(item => (
                <Message.Provider
                    key={item.uuid}
                    isError={item.isError}
                    message={item}
                    withIcon={messages.indexOf(item) === 0 || messages[messages.indexOf(item) - 1].role !== item.role}
                    isLastMessage={messages.indexOf(item) === messages.length - 1 && !isTyping}
                >
                    <Message.Container>
                        <Message.Avatar />
                        <Message.Content.Container>
                            <Message.Content.TEXT>
                                <Message.Detail />
                            </Message.Content.TEXT>
                            <Message.Content.LINK />
                            <Message.Content.IMAGE>
                                <Message.Detail />
                            </Message.Content.IMAGE>
                            <Message.Content.DOCUMENT>
                                <Message.Detail />
                            </Message.Content.DOCUMENT>
                        </Message.Content.Container>
                        <Message.Status />
                    </Message.Container>
                </Message.Provider>
            ))}
        </React.Fragment>
    );
}