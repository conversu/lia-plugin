import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useChatForm } from "../provider/hook.form";

import { isMobileDevice } from "@utils/utils";

import { useTheme } from "@theme/theme.hook";
import { useChat } from "@services/chat/chat.hook";
import { useCurrentBot } from "@services/bot/bot.hook";


interface Props {
    children: ReactNode;
    props?: FlexProps;
}


export function ChatFormInputContainer({ children, props }: Props) {

    const { isDarkTheme } = useTheme();
    const { bot } = useCurrentBot();
    const { isFocused } = useChat();
    const { isError, hasPreview } = useChatForm();


    return (
        <Flex
            id='input-container'
            w='100%'
            rounded={hasPreview ? 'lg' : 'full'}
            borderStyle='solid'
            borderWidth={isError ? '2px' : '1px'}
            borderColor={isError ? 'red.500' : isFocused ? bot.layout.colors.secondary : 'gray.300'}
            flexDir='row'
            align='end'
            px={hasPreview ? undefined : {
                base: !isMobileDevice() ? '.5rem' : undefined,
                sm: !isMobileDevice() ? '.5rem' : undefined,
                md: undefined,
                lg: undefined,
                xl: undefined
            }}
            justify='space-between'
            gap={{
                base: '0rem',
                sm: '0rem',
                md: '1rem',
                lg: '1rem',
                xl: '1rem'
            }}
            bg={isDarkTheme ? 'gray.700' : 'white'}
            {...props}
        >
            {children}
        </Flex>
    );
}