import { Icon, IconButton } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { usePopoverContext } from "../provider/hook";
import { conversuColors } from "../../../theme/theme.global";


interface Props {
    color?: string
}

export default function PopoverButton({
    color = conversuColors.orange
}: Props) {

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
            colorScheme='orange'
            boxShadow='lg'
            bg={color}
            _hover={{
                bg: color,
                color: 'white'
            }}
        />
    );
}