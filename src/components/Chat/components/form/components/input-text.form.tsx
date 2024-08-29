import { Input, InputProps as ChrakraInputProps } from "@chakra-ui/react";

import { InputBaseProps } from "@components/Input/components/InputContainer";

import { useCurrentBot } from "@services/bot/bot.hook";
import { InputType } from "@services/chat/chat.type";
import { useChat } from "@services/chat/chat.hook";

import { useTheme } from "@theme/theme.hook";

import { useChatForm } from "../provider/hook.form";



export interface InputTextProps extends InputBaseProps, ChrakraInputProps {
    isError?: boolean;
    showImage?: boolean;
    isSubmitting?: boolean;
    isDisabled?: boolean;
}

export function InputText({
    isError = false,
    showImage = false,
    isSubmitting = false,
    isDisabled = false,
    ...rest
}: InputTextProps) {


    const { bot } = useCurrentBot();
    const { inputProps } = useTheme();

    const {
        textInputRef,
        message,
        setMessage,
        inputType,
        hasPreview
    } = useChatForm();


    const {
        isTyping,
        showInput,
        hasAgent,
        isFocused,
        setIsFocused
    } = useChat();

    function getPlaceholder() {

        if (hasPreview) {

            const description = inputType === InputType.IMAGE ? 'dessa imagem...' : 'desse documento...'

            return `Adicione uma descrição à respeito ${description}`;
        }

        if (isSubmitting || isTyping) {

            if (hasAgent) {

                return 'Enviando mensagem...';
            }

            return `${bot?.nickname ?? 'Lia'} está digitando...`;
        }

        return "Em que eu posso ajudar?";
    }

    return (
        <Input
            type='text'
            name='message'
            h={{
                base: '2.5rem',
                sm: '2.5rem',
                md: '3rem',
                lg: '3rem',
                xl: '3rem'
            }}
            variant='unstyled'
            px={{
                base: '0.5rem',
                sm: '0.5rem',
                md: '1.15rem',
                lg: '1.15rem',
                xl: '1.15rem'
            }}
            _placeholder={{
                color: isError && !isFocused ? 'red.500' : inputProps.color
            }}
            bg='transparent'
            border='none'
            focusBorderColor='none'
            _focus={{
                border: 'none',
                color: isError && !isFocused ? 'red.500' : undefined
            }}
            placeholder={getPlaceholder()}
            alt='enviar'
            isDisabled={!showInput || isDisabled || isSubmitting || isTyping}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rounded='full'
            value={message}
            onChange={event => setMessage(event.target.value)}
            fontSize='1rem'
            ref={textInputRef}
            {...rest}
        />
    );
}
