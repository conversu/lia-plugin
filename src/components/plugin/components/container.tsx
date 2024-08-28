import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface PluginContainerProps {
    children: ReactNode;
    props?: BoxProps;
}


export default function PluginContainer({ children, props }: PluginContainerProps) {

    //event listener para aumentar ou diminuir o tamanho dessa div

    return (
        <Flex w='99vw' h='100%' minH='98vh' flexDir='column' align='flex-end' justify='flex-end' bg='transparent'>
            <Box
                position='relative'
                bottom='2'
                right='2'
                zIndex={3000}
                w='416px'
                h='616px'
                p='.5rem'
                border='1px solid red'
                {...props}
            >
                {children}
            </Box>
        </Flex>
    );
}