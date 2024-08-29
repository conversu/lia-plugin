import { Icon, IconButton } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { usePopoverContext } from "../provider/hook";



export default function PopoverButton() {

    const { isExpanded, onToggle } = usePopoverContext();

    return (
        <IconButton
            icon={<Icon as={isExpanded ? FiX : FiSmile} fontSize='1.5rem' />}
            aria-label="Open"
            rounded='full'
            size='lg'
            onClick={onToggle}
            color='white'
            cursor='pointer'
            colorScheme='purple'
            bg='app.orange'
        />
    );
}