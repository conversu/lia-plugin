import InputMask from "react-input-mask";
import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
    Input as ChakraInput,
    InputProps as ChrakraInputProps
} from '@chakra-ui/react';

import { useTheme } from "@theme/theme.hook";
import { InputBaseProps, InputContainer } from "../components/InputContainer";
import { useCurrentBot } from "@services/bot/bot.hook";


export interface CnpjInputProps extends InputBaseProps, ChrakraInputProps {

}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, CnpjInputProps> = ({
    name,
    label,
    error = null,
    labelProps,
    isLoading = false,
    renderIf = true,
    ...rest
}, ref) => {

    const { style } = useCurrentBot();
    const { inputProps } = useTheme();

    return (
        <InputContainer
            htmlFor={name}
            label={label}
            error={error}
            labelProps={labelProps}
            isLoading={isLoading}
            renderIf={renderIf}
        >
            < ChakraInput
                id={name}
                name={name}
                as={InputMask}
                mask='99.999.999/9999-99'
                maskChar={null}
                variant={rest.variant ?? "flushed"}
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


export const CnpjInput = forwardRef(InputBase);