import { createContext } from "react";


interface IPopoverContext {
    isExpanded: boolean;
    onToggle: () => void;
    onClose: () => void;
    onOpen: () => void;
    height: number;
}

export const PopoverContext = createContext({} as IPopoverContext);