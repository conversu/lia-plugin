import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePopoverContext } from "../provider/hook";

interface Props {
    children: ReactNode;
}

export default function PopoverBody({ children }: Props) {

    const { height } = usePopoverContext();

    const headerSize = document.getElementById('popover-header')?.clientHeight ?? 0;
    const footerSize = document.getElementById('popover-footer')?.clientHeight ?? 0;


    return (
        <Flex
            w='100%'
            h={`${height - headerSize - footerSize}px)`}
            flexDir='column'
            align='center'
            justify='center'
        >
            {children}
        </Flex>

    );
}