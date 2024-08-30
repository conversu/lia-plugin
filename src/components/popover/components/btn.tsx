import { Icon, IconButton } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { usePopoverContext } from "../provider/hook";
import { Chat } from "@conversu/chat";



export default function PopoverButton() {

    const { isExpanded, onToggle } = usePopoverContext();
    const { layout } = Chat.Theme.use();

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
            bg={layout.colors.primary}
            _hover={{
                bg: layout.colors.secondary,
                color: 'white'
            }}
        />
    );
}