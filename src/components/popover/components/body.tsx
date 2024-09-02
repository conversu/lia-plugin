import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePlugin } from "../../../services/plugin/hook";

interface Props {
    children: ReactNode;
}

export default function PopoverBody({ children }: Props) {

    const { height } = usePlugin();

    const headerSize = document.getElementById('popover-header')?.clientHeight ?? 0;
    const footerSize = document.getElementById('popover-footer')?.clientHeight ?? 0;


    return (
        <Flex
            w='100%'
            h={`${height - headerSize - footerSize}px)`}
            flexDir='column'
            align='center'
            justify='flex-start'
            overflowY='auto'
            __css={{
                '::-webkit-scrollbar': {
                    'width': '4px'
                },
                /* Track */
                '::-webkit-scrollbar-track': {
                    'background': useColorModeValue('white', 'gray.600')
                },
                /* Handle */
                '::-webkit-scrollbar-thumb': {
                    'background': useColorModeValue('gray.100', 'gray.800'),
                    'borderRadius': '8px',
                    'cursor': 'pointer'
                },
                /* Handle on hover */
                '::-webkit-scrollbar-thumb:hover': {
                    'background': useColorModeValue('gray.200', 'gray.900')
                }
            }}
        >
            <Box id='body-top' w='100%' />
            {children}
            <Box id='body-bottom' w='100%' />
        </Flex>
    );
}