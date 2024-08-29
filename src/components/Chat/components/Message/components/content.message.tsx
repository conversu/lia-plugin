import { ReactNode } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { useMessageContext } from "../provider/message.hook";


interface Props {
    children: ReactNode;
    props?: FlexProps;
}


export default function MessageContent({
    children,
    props
}: Props) {

    const {
        isAssistant,
        isError,
        error,
        bg,
        color,
    } = useMessageContext();

    return (
        <Flex
            w='100%'
            minW='100px'
            px={{
                base: '.25rem',
                sm: '.25rem',
                md: '0.5rem',
                lg: '0.5rem',
                xl: '0.5rem'
            }}
            py={{
                base: '.25rem',
                sm: '.25rem',
                md: '0.5rem',
                lg: '0.5rem',
                xl: '0.5rem'
            }}
            flexDir='column'
            align='start'
            justify='flex-start'
            gap='1rem'
            boxShadow='md'
            ml={isAssistant ? {
                base: '.75rem',
                sm: '.75rem',
                md: '1rem',
                lg: '1rem',
                xl: '1rem'
            } : undefined}
            mr={!isAssistant ? {
                base: '.75rem',
                sm: '.75rem',
                md: '1rem',
                lg: '1rem',
                xl: '1rem'
            } : undefined}
            borderWidth={isError ? '0.5px' : undefined}
            borderStyle='solid'
            borderColor={isError ? error.color : bg}
            borderRadius={isAssistant ? '0px 10px 10px 10px' : '10px 0px 10px 10px'}
            color={isError ? error.color : color}
            bg={bg}
            {...props}
        >
            {children}
        </Flex>
    );
}