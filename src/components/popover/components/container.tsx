import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import { usePlugin } from "../../../services/plugin/hook";



interface Props {
    children: ReactNode;
    buttonSize: number;
}

export default function Container({
    children
}: Props) {

    const { contentPositionProps, popover } = usePlugin();


    return (
        <Flex
            h='100%'
            w={`${popover.width}px`}
            maxH={`${popover.height - 4}px`}
            {...contentPositionProps}
        >
            {children}
        </Flex>
    );
}