import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import PopoverProvider from "../provider/provider";
import { usePlugin } from "../../../services/plugin/hook";



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

    const { contentPositionProps } = usePlugin();


    return (
        <PopoverProvider
            height={height}
        >
            <Flex
                h='100%'
                w={`${width}px`}
                maxH={`${height + 32}px`}
                gap='.5rem'
                {...contentPositionProps}
            >
                {children}
            </Flex>
        </PopoverProvider>
    );
}