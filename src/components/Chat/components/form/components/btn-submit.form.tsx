import { Icon, Spinner } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { RenderElse } from "@components/utils/RenderElse";
import { RenderIf } from "@components/utils/RenderIf";

import { BiErrorCircle } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

import { useTheme } from "@theme/theme.hook";
import { useCurrentBot } from "@services/bot/bot.hook";
import { useChat } from "@services/chat/chat.hook";

import { useChatForm } from "../provider/hook.form";


interface Props {
    renderIf?: boolean;
    variant?: 'filled' | 'ghost';
}

export function ChatFormSubmitButton({
    variant = 'filled',
    renderIf = true
}: Props) {

    const { bot } = useCurrentBot();
    const { isTyping, isFocused } = useChat();
    const { isSubmitting, isError, isDisabled } = useChatForm();
    const { isDarkTheme } = useTheme();

    const style = {
        filled: {
            w: {
                base: '2.25rem',
                sm: '2.25rem',
                md: '2.85rem',
                lg: '2.85rem',
                xl: '2.85rem'
            },
            h: {
                base: '2.25rem',
                sm: '2.25rem',
                md: '2.85rem',
                lg: '2.85rem',
                xl: '2.85rem'
            },
            mb: '0.25rem',
            borderRadius: '100%',
            bg: !isError || isFocused ? bot.layout.colors.secondary : 'transparent',
            color: isError ? 'red.500' : 'white'
        },
        ghost: {
            w: {
                base: '2.25rem',
                sm: '2.25rem',
                md: '2.85rem',
                lg: '2.85rem',
                xl: '2.85rem'
            },
            h: {
                base: '2.25rem',
                sm: '2.25rem',
                md: '2.85rem',
                lg: '2.85rem',
                xl: '2.85rem'
            },
            borderRadius: '100%',
            bg: 'transparent',
            color: isError ? 'red.500' : isFocused ? bot.layout.colors.secondary : isDarkTheme ? 'white' : 'gray.400'
        }

    }


    if (!renderIf) {

        return (<></>);
    }

    return (
        <Button.Primary
            type='submit'
            _disabled={{
                cursor: 'not-allowed'
            }}
            _hover={{
                filter: 'brightness(0.9)',
                opacity: 0.9,
            }}
            opacity={isSubmitting || isTyping ? 0.8 : undefined}
            cursor={isSubmitting || isTyping ? 'not-allowed' : 'pointer'}
            isDisabled={isDisabled || isSubmitting || isError || isTyping}
            {...style[variant]}
        >
            <RenderIf condition={isSubmitting || isTyping}>
                <Spinner size='sm' colorScheme='whiteAlpha' />
            </RenderIf>
            <RenderElse condition={isSubmitting || isTyping}>
                <RenderIf condition={!isError || isFocused}>
                    <Icon
                        as={FiSend}
                        fontSize={{
                            base: '1rem',
                            sm: '1rem',
                            md: '1.15rem',
                            lg: '1.15rem',
                            xl: '1.15rem'
                        }}
                    />
                </RenderIf>
                <RenderElse condition={!isError || isFocused}>
                    <Icon
                        as={BiErrorCircle}
                        fontSize={{
                            base: '1.25rem',
                            sm: '1.25rem',
                            md: '1.5rem',
                            lg: '1.5rem',
                            xl: '1.5rem'
                        }}
                    />
                </RenderElse>
            </RenderElse>
        </Button.Primary>
    );
}