import { Flex } from "@chakra-ui/react";
import PopoverProvider from "../provider/provider";
import { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default function Container({
    children
}: Props) {


    return (
        <PopoverProvider
            height={700}
        >
            <Flex
                h='100%'
                w='100%'
                minW='500px'
                maxW='500px'
                maxH='650px'
                flexDir='column'
                align='flex-end'
                justify='flex-end'
                gap='.5rem'
            >
                {children}
            </Flex>
        </PopoverProvider>
    );
}