import { ReactNode, useState } from "react";
import { PopoverContext } from "./context";


interface Props {
    children: ReactNode;
    height: number;
}

export default function PopoverProvider({ height, children }: Props) {

    const [isExpanded, setIsExpanded] = useState(false);


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