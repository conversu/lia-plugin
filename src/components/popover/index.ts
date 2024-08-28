
import PopoverContainer from "./components/container";
import PopoverButton from "./components/btn";
import { usePopoverContext } from "@chakra-ui/react";
import PopoverContent from "./components/content";
import PopoverHeader from "./components/header";
import PopoverFooter from "./components/footer";
import PopoverBody from "./components/body";



export const PluginPopover = {
    useContext: usePopoverContext,
    Container: PopoverContainer,
    Button: PopoverButton,
    Content: PopoverContent,
    Header: PopoverHeader,
    Body: PopoverBody,
    Footer: PopoverFooter
}