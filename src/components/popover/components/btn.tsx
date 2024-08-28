import { Icon, IconButton } from "@chakra-ui/react";
import { FiSmile } from "react-icons/fi";
import { usePopoverContext } from "../provider/hook";



export default function PopoverButton() {

    const { isExpanded, onToggle } = usePopoverContext();

    if (isExpanded) {
        return (<></>);
    }

    return (
        <IconButton
            icon={<Icon as={FiSmile} fontSize='1.5rem' />}
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