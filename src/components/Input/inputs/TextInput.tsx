import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
    Input as ChakraInput,
    InputProps as ChrakraInputProps
} from '@chakra-ui/react';
import { useTheme } from '@theme/theme.hook';
import { InputBaseProps, InputContainer } from '../components/InputContainer';
import { useCurrentBot } from '@services/bot/bot.hook';


export interface TextInputProps extends InputBaseProps, ChrakraInputProps {

}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({
    name,
    label,
    error = null,
    labelProps,
    isLoading = false,
    renderIf = true,
    rightElement,
    rightElementsProps,
    showError = true,
    ...rest
}, ref) => {

    const { inputProps } = useTheme();
    const { style } = useCurrentBot();

    return (
        <InputContainer
            htmlFor={name}
            label={label}
            error={error}
            labelProps={labelProps}
            isLoading={isLoading}
            renderIf={renderIf}
            rightElement={rightElement}
            rightElementsProps={rightElementsProps}
            showError={showError}
        >
            < ChakraInput
                id={name}
                name={name}
                variant={rest.variant ?? 'outline'}
                ref={ref}
                {...Object.assign(inputProps, {
                    _hover: {
                        borderColor: style.colors.secondary,
                    },
                    color: style.colors.secondary,
                    focusBorderColor: style.colors.secondary,
                    _focus: {
                        color: style.colors.secondary
                    }
                })}
                {...rest}
            />
        </InputContainer>
    )
}


export const TextInput = forwardRef(InputBase);