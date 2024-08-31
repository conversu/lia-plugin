import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import PopoverProvider from "../provider/provider";



interface Props {
    children: ReactNode;
    height: number;
    width: number;
}

export default function Container({
    height = 700,
    width = 450,
    children
}: Props) {


    return (
        <PopoverProvider
            height={height}
        >
            <Flex
                h='100%'
                w={`${width}px`}
                maxH={`${height + 32}px`}
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