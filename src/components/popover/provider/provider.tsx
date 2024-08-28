import { ReactNode, useState } from "react";
import { PopoverContext } from "./context";


interface Props {
    children: ReactNode;
}

export default function PopoverProvider({ children }: Props) {

    const [isExpanded, setIsExpanded] = useState(false);

    const height = 600;


    return (
        <PopoverContext.Provider value={{
            isExpanded,
            onClose: () => setIsExpanded(false),
            onOpen: () => setIsExpanded(true),
            onToggle: () => setIsExpanded(!isExpanded),
            height
        }}
        >
            {children}
        </PopoverContext.Provider>
    )
}