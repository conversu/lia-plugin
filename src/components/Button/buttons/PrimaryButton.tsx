import { Button, ButtonProps } from "@chakra-ui/react";
import { useCurrentBot } from "@services/bot/bot.hook";

interface Props extends ButtonProps {

}

export function PrimaryButton({ ...rest }: Props) {

    const { bot } = useCurrentBot();

    return (
        <Button
            bg={bot.layout?.colors.secondary ?? 'conversu.orange'}
            color='white'
            _hover={{
                bg: bot.layout?.colors.secondary ?? 'conversu.orange',
                filter: 'brightness(0.9)'
            }}
            size='md'
            w='100%'
            maxW='250px'
            {...rest}
        />
    );
}