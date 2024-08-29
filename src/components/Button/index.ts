import { Button as ChakraButton } from '@chakra-ui/react';
import { IconButton } from "./buttons/IconButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { ThemeButton } from './buttons/ThemeButton';



export const Button = {
    Primary: PrimaryButton,
    Custom: ChakraButton,
    Icon: IconButton,
    Theme: ThemeButton
}