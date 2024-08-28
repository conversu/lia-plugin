import { Box, Flex, SlideFade, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePopoverContext } from "../provider/hook";

interface Props {
    children: ReactNode;
}

function Content({ children }: Props) {

    const { isExpanded, height } = usePopoverContext();

    return (
        <Box w='100%' h='100%'>
            <SlideFade in={isExpanded} offsetY='1rem'>
                <Flex
                    w='100%'
                    h={`${height}px`}
                    flexDir='column'
                    align='center'
                    justify='space-between'
                    bg={useColorModeValue('gray.50', 'gray.600')}
                    borderRadius='.75rem .75rem 0rem .75rem'
                    boxShadow='lg'
                    py='.5rem'
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