import { Icon, IconButton } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";


interface Props {
    color?: string;
    size?: number;
}

export default function PopoverButton({
    color = conversuColors.orange,
    size = 64
}: Props) {

    const { isExpanded, onToggle, isShortVersion } = usePlugin();

    const buttonSize = size * (isExpanded ? 0.6 : 1) * (isShortVersion ? 0.8 : 1)

    return (
        <IconButton
            icon={
                <Icon
                    as={isExpanded ? FiX : FiSmile}
                    fontSize={`${buttonSize - 16}px`}
                />
            }
            aria-label="Abrir chat"
            rounded='full'
            w={`${buttonSize}px`}
            h={`${buttonSize}px`}
            onClick={onToggle}
            color='white'
            cursor='pointer'
            colorScheme='orange'
            bg={color}
            _hover={{
                bg: color,
                color: 'white'
            }}
            boxShadow='2xl'
        />
    );
}