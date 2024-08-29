import { IconButtonProps } from "@chakra-ui/react";



interface Props extends IconButtonProps {
}

export function IconButton({ ...rest }: Props) {

    return (
        <IconButton
            variant='ghost'
            rounded='full'
            size='xs'
            colorScheme='gray'
            fontSize='1.15rem'
            {...rest}
        />
    );
}