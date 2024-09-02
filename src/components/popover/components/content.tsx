import { Box, Center, Flex, SlideFade, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePlugin } from "../../../services/plugin/hook";

interface Props {
    children: ReactNode;
    border?: string;
}

function Content({ children, border }: Props) {

    const { borderRadius, isShortVersion, isExpanded, height, width, buttonSize } = usePlugin();

    return (
        <Box w='100%' h='100%'>
            <SlideFade in={isExpanded} offsetY='1rem'>
                <Center w='100%' h='100%'>
                    <Flex
                        w={isShortVersion ? `${width - 16}px` : '100%'}
                        h={`${height - buttonSize}px`}
                        flexDir='column'
                        align='center'
                        justify='space-between'
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        borderRadius={borderRadius}
                        boxShadow='lg'
                        borderColor={useColorModeValue(border ? border : 'gray.100', border ? border : 'gray.800')}
                        borderWidth={border === 'none' ? '0px' : '1px'}
                        borderStyle='solid'
                    >
                        {children}
                    </Flex>
                </Center>
            </SlideFade>
        </Box>
    );
}


export default function PopoverContent(props: Props) {

    const { isExpanded } = usePlugin();

    if (isExpanded) {

        return (<Content {...props} />)
    }

    return (<></>);
}