import { Flex, FlexProps } from "@chakra-ui/react";
import { useChat } from "@services/chat/chat.hook";
import { isIOS, isMobileDevice } from "@utils/utils";

interface Props extends FlexProps {

}


export function Footer({ ...rest }: Props) {

    const { isFocused } = useChat();

    return (
        <Flex
            w='100%'
            flexDir='column'
            align='end'
            justify='flex-end'
            px='1rem'
            position={isMobileDevice() ? 'fixed' : 'relative'}
            bottom={isMobileDevice() ? '0' : undefined}
            mb={isMobileDevice() && isFocused && isIOS() ? '1rem' : undefined}
            id='chat-form'
            {...rest}
        />
    );
}