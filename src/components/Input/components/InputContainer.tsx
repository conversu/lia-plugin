import { ReactNode } from "react";
import { Center, FormControl, FormErrorMessage, Icon, InputGroup, InputRightElement, InputRightElementProps } from "@chakra-ui/react";

import { FieldError } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";



import { useTheme } from "@theme/theme.hook";

import { InputLabel, InputLabelProps } from "./InputLabel";
import { InputLoading } from "./InputLoading";


export interface InputBaseProps {
    htmlFor?: string;
    label?: string;
    error?: FieldError | null;
    isValid?: boolean;
    labelProps?: InputLabelProps;
    isLoading?: boolean;
    renderIf?: boolean;
    isRequired?: boolean;
    showError?: boolean;
    rightElement?: ReactNode;
    rightElementsProps?: InputRightElementProps;
}

interface Props extends InputBaseProps {
    children: ReactNode;
}


export function InputContainer({
    children,
    htmlFor,
    label,
    error = null,
    labelProps,
    isLoading = false,
    renderIf = false,
    isRequired = false,
    showError = true,
    rightElement = null,
    rightElementsProps
}: Props) {

    const { isDarkTheme } = useTheme();

    return (
        <RenderIf condition={renderIf}>
            <Loadable
                isLoading={isLoading}
                skeleton={<InputLoading label={label} />}
            >
                <FormControl isInvalid={!!error}>
                    <InputLabel
                        htmlFor={htmlFor}
                        renderIf={!!label}
                        isDarkTheme={isDarkTheme}
                        isRequired={isRequired}
                        {...labelProps}
                    >
                        {label}
                    </InputLabel>
                    <InputGroup>
                        {children}
                        <RenderIf condition={!!error}>
                            <InputRightElement pointerEvents='none' h='100%' justifyContent='end' pr='.5rem'>
                                <Center h='100%'>
                                    <Icon as={MdErrorOutline} color='red.500' fontSize='1rem' />
                                </Center>
                            </InputRightElement>
                        </RenderIf>
                        <RenderIf condition={!error && !!rightElement}>
                            <InputRightElement {...rightElementsProps}>
                                {rightElement}
                            </InputRightElement>
                        </RenderIf>
                    </InputGroup>
                    <RenderIf condition={!!error && showError}>
                        <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </RenderIf>
                </FormControl>
            </Loadable>
        </RenderIf>
    );
}