import { Flex, FlexProps, Skeleton } from "@chakra-ui/react";
import { RenderIf } from "@components/utils/RenderIf";
import { useTheme } from "@theme/theme.hook";


interface InputLoadingProps extends FlexProps {
    label?: string;
    rows?: number;
}

export function InputLoading({ label, rows = 1, ...rest }: InputLoadingProps) {

    const { inputProps } = useTheme();

    return (
        <Flex
            w='100%'
            flexDir='column'
            align='start'
            justify='center'
            gap='0.5rem'
            {...rest}
        >
            <RenderIf condition={!!label}>
                <Skeleton
                    w={`${!!label ? label.length * 15 : 0}px`}
                    h='1rem'
                    rounded={inputProps.rounded}
                />
            </RenderIf>
            <Skeleton
                w='100%'
                h={`${rows * 3}rem`}
                rounded={inputProps.rounded}
            />
        </Flex>
    );
}