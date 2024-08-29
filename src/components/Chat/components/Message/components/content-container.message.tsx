import { Flex, FlexProps } from "@chakra-ui/react";
import { useMessageContext } from "../provider/message.hook";

interface Props extends FlexProps {

}


export default function MessageContentContainer({ ...rest }: Props) {

    const { isAssistant } = useMessageContext();

    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify={isAssistant ? 'flex-start' : 'flex-end'}
            {...rest}
        />
    );
}