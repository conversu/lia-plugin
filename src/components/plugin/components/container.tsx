import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface PluginContainerProps {
    children: ReactNode;
    props?: BoxProps;
}


export default function PluginContainer({ children, props }: PluginContainerProps) {

    return (
        <Box
            position='absolute'
            bottom='2'
            right='2'
            zIndex={9998}
            p='.5rem'
            // border='1px solid red'
            {...props}
        >
            {children}
        </Box>
    );
}