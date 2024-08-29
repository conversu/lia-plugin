import { FormLabel, FormLabelProps, Icon, Text, Tooltip } from "@chakra-ui/react";
import { RenderIf } from "@components/utils/RenderIf";
import { useTheme } from "@theme/theme.hook";
import { ReactNode } from "react";
import { BiHelpCircle } from "react-icons/bi";



export interface InputLabelProps extends FormLabelProps {
    children?: ReactNode;
    renderIf?: boolean;
    tooltip?: string;
    isDarkTheme?: boolean;
    isRequired?: boolean;
}


export function InputLabel({ children, tooltip, renderIf = true, isDarkTheme = false, isRequired = false, ...rest }: InputLabelProps) {

    const { inputProps } = useTheme();


    return (
        <RenderIf condition={renderIf}>
            <FormLabel
                fontWeight="regular"
                _invalid={{ color: 'red' }}
                textAlign="left"
                w='100%'
                pl='0.5rem'
                color={inputProps.borderColor}
                fontSize={{ base: '0.875rem', sm: '0.875rem', md: '1rem', lg: '1rem', xl: '1rem' }}
                {...rest}
            >
                {children}{isRequired && (<Text as='span' color='app.orange'> *</Text>)}
                <RenderIf condition={!!tooltip}>
                    <Tooltip
                        placement='bottom'
                        bgColor='app.orange'
                        color='white'
                        rounded='2xl'
                        hasArrow
                        label={tooltip}
                    >
                        <Text
                            as='span'
                            ml='2'
                            verticalAlign='baseline'
                            cursor='pointer'
                            mb='-2px'
                            color={isDarkTheme ? "white" : 'app.purple'}
                            _hover={{
                                color: 'app.orange'
                            }}
                        >
                            <Icon as={BiHelpCircle} fontSize='1rem' />
                        </Text>
                    </Tooltip>
                </RenderIf>
            </FormLabel>
        </RenderIf>
    );
}