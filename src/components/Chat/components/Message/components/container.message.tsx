import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import { useMessageContext } from "../provider/message.hook";



interface Props {
    children: ReactNode;
}


export default function MessageContainer({ children }: Props) {

    const {
        isAssistant,
        withIcon,
        isLastMessage,
        message
    } = useMessageContext();

    return (
        <Flex
            id={message.uuid}
            w='100%'
            flexDir='row'
            align='center'
            justify={isAssistant ? 'flex-start' : 'flex-end'}
            mt={withIcon ? '2' : undefined}
            pb={isLastMessage ? '4' : undefined}
        >
            <Flex
                maxW={{
                    base: '90%',
                    sm: '90%',
                    md: '80%',
                    lg: '80%',
                    xl: '80%'
                }}
                flexDir='column'
                align={isAssistant ? 'start' : 'end'}
                justify='center'
                gap={{
                    base: '0.5rem',
                    sm: '0.5rem',
                    md: '1rem',
                    lg: '1rem',
                    xl: '1rem'
                }}
            >
                {children}
            </Flex>
        </Flex>
    );
}