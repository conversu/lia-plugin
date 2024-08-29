import { ReactNode, useEffect } from "react";

import { Flex } from "@chakra-ui/react";
import { useChat } from "@services/chat/chat.hook";
import { useInteraction } from "@services/interaction/interaction.hook";


interface Props {
    children: ReactNode;
}

export function ChatContainer({ children }: Props) {

    const { hideBrowserHeader } = useInteraction();
    const { isFocused } = useChat();

    useEffect(() => {
        hideBrowserHeader();
    }, [isFocused]);


    return (
        <Flex
            w='100%'
            h='100%'
            flexDir='column'
            align='center'
            justify='flex-start'
        >
            {children}
        </Flex>
    );
}