import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default function PopoverFooter({ children }: Props) {


    return (
        <Flex
            id='popover-footer'
            w='100%'
            flexDir='column'
            justify='flex-end'
            px='.5rem'
            pt='.5rem'
        >
            {children}
        </Flex>
    );
}