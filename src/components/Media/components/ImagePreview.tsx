import { Box, BoxProps, Flex, Icon, Image, ImageProps, Skeleton, Text } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { Loadable } from "@components/utils/Loadable";
import { useMedia } from "@hooks/useMedia";
import { AttachmentType } from "@services/attachment/attachment.types";
import { FiRefreshCw } from "react-icons/fi";
import { LuImageOff } from "react-icons/lu";


interface Props {
    src?: string | null;
    alt?: string;
    color?: string;
    renderIf?: boolean;
    onClick?: () => void;
    size?: 'small' | 'large';
    props?: ImageProps;
    containerProps?: BoxProps;
    isSynchronizing?: boolean;
}


export default function ImagePreview({
    src = null,
    alt = 'imagem',
    color = 'gray.400',
    renderIf = true,
    onClick = () => { },
    size = 'small',
    containerProps,
    isSynchronizing = false,
    props
}: Props) {

    const { data, isLoading, refetch } = useMedia(AttachmentType.IMAGE, src);

    if (!renderIf) {

        return (<></>);
    }

    return (
        <Box
            w='100%'
            h='100%'
            maxH={size === 'small' ? '300px' : undefined}
            maxW={size === 'small' ? '300px' : undefined}
            bg='transparent'
            cursor={!!data ? 'pointer' : undefined}
            onClick={!!data ? () => onClick() : undefined}
            {...containerProps}
        >
            <Loadable
                isLoading={isSynchronizing || isLoading}
                skeleton={<Skeleton w='100%' h='100%' rounded='lg' />}
            >
                <Image
                    w='100%'
                    h='100%'
                    maxW={size === 'small' ? '300px' : '600px'}
                    maxH={size === 'small' ? '300px' : '600px'}
                    src={data as string}
                    alt={alt}
                    objectFit='contain'
                    rounded='lg'
                    borderRadius='10px'
                    fallback={
                        <Flex
                            flexDir='column'
                            align='center'
                            justify='center'
                            w='100%'
                            h='100%'
                            rounded='lg'
                            minH='150px'
                            bg='gray.25'
                            gap='1rem'
                        >
                            <Icon
                                as={LuImageOff}
                                fontSize='1.5rem'
                                color={color}
                            />
                            <Text
                                as='span'
                                color={color}
                                fontSize='0.675rem'
                                fontWeight='thin'
                                w='100%'
                                textAlign='center'
                            >
                                Não foi possível carregar imagem
                            </Text>
                            <Button.Custom
                                variant='ghost'
                                leftIcon={<Icon as={FiRefreshCw} />}
                                colorScheme='gray'
                                size='xs'
                                onClick={() => refetch()}
                            >
                                recarregar
                            </Button.Custom>
                        </Flex>
                    }
                    {...props}
                />
            </Loadable>
        </Box>
    );
}