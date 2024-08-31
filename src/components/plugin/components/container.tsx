import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePlugin } from "../../../services/plugin/hook";

export interface PluginContainerProps {
    children: ReactNode;
    props?: BoxProps;
}


export default function PluginContainer({
    children,
    props
}: PluginContainerProps) {

    const { containerPositionProps } = usePlugin();


    return (
        <Box
            position='fixed'
            zIndex={9998}
            p='.5rem'
            {...containerPositionProps}
            {...props}
        >
            {children}
        </Box>
    );
}