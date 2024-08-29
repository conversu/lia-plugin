import { Button, Center, Icon } from "@chakra-ui/react";
import { useCurrentBot } from "@services/bot/bot.hook";
import { useTheme } from "@theme/theme.hook";
import { MdOutlineLightMode, MdOutlineNightlightRound } from "react-icons/md";


interface Props {
}


export function ThemeButton({ }: Props) {

    const { bot } = useCurrentBot();
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            variant='unstyled'
            bg='transparent'
            colorScheme='gray'
            _hover={{
                bg: isDarkTheme ? 'gray.800' : 'gray.50',
                color: bot.layout.colors.secondary
            }}
            rounded='full'
        >
            <Center w='100%' h='100%'>
                <Icon
                    as={isDarkTheme ? MdOutlineNightlightRound : MdOutlineLightMode}
                    fontSize={{
                        base: '1.15rem',
                        sm: '1.15rem',
                        md: '1.5rem',
                        lg: '1.5rem',
                        xl: '1.5rem'
                    }}
                />
            </Center>
        </Button>
    );
}