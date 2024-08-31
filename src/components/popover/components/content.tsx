import { Box, Flex, SlideFade, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePopoverContext } from "../provider/hook";
import { usePlugin } from "../../../services/plugin/hook";

interface Props {
    children: ReactNode;
    border?: string;
}

function Content({ children, border }: Props) {

    const { isExpanded, height } = usePopoverContext();
    const { borderRadius } = usePlugin();

    return (
        <Box w='100%' h='100%'>
            <SlideFade in={isExpanded} offsetY='1rem'>
                <Flex
                    w='100%'
                    h={`${height - 32}px`}
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
            </SlideFade>
        </Box>
    );
}


export default function PopoverContent(props: Props) {

    const { isExpanded } = usePopoverContext();

    if (isExpanded) {

        return (<Content {...props} />)
    }

    return (<></>);
}