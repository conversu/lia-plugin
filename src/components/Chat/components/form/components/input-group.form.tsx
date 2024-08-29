import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {

}

export function ChatFormInputGroup({ ...rest }: Props) {

    return (
        <Flex
            w='100%'
            flexDir='column'
            align='flex-start'
            justify='flex-end'
            gap='0.5rem'
            {...rest}
        />
    );
}