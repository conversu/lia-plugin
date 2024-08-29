import { Box, BoxProps, Center, Flex, Icon, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { Loadable } from "@components/utils/Loadable";
import { RenderElse } from "@components/utils/RenderElse";
import { RenderIf } from "@components/utils/RenderIf";


import { AttachmentType } from "@services/attachment/attachment.types";
import { FORMAT } from '@conversu/commons';

import { FaRegFilePdf } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useMedia } from "@hooks/useMedia";


interface Props {
    src?: string | null;
    name?: string;
    extension?: string;
    fileSize?: number;
    fileSizeUnit?: 'Mb' | 'Kb' | 'Gb';
    onClick?: () => void;
    color?: string;
    renderIf?: boolean;
    size?: 'small' | 'large';
    containerProps?: BoxProps;
    isDownloading?: boolean;
    isSynchronizing?: boolean;
}

export default function DocumentPreview({
    src = null,
    name = 'anexo.pdf',
    extension = 'PDF',
    fileSize = 0,
    fileSizeUnit = 'Mb',
    onClick = () => { },
    color = 'gray.400',
    renderIf = true,
    size = 'small',
    containerProps,
    isDownloading = false,
    isSynchronizing = false
}: Props) {

    const { data, isLoading, isSuccess, isError, refetch } = useMedia(AttachmentType.DOCUMENT, src);

    if (!renderIf) {

        return (<></>);
    }

    return (
        <Box
            w='100%'
            bg='transparent'
            cursor={!!data && isSuccess ? 'pointer' : undefined}
            onClick={!!data && isSuccess ? () => onClick() : undefined}
            {...containerProps}
        >
            <Loadable
                isLoading={isSynchronizing || isLoading}
                skeleton={<Skeleton w='60px' h='200px' rounded='lg' />}
            >
                <RenderIf condition={isSuccess && !!data}>
                    <RenderIf condition={size === 'small'}>
                        <Flex
                            w='100%'
                            minW='200px'
                            flexDir='row'
                            align='center'
                            justify='center'
                            gap='1rem'
                            rounded='lg'
                            bg='white'
                        >
                            <Center w='4rem' h='3rem' bg='white' rounded='lg'>
                                <RenderIf condition={isDownloading}>
                                    <Spinner size='md' color='red.500' />
                                </RenderIf>
                                <RenderElse condition={isDownloading}>
                                    <Icon as={FaRegFilePdf} fontSize='2rem' color='red.500' />
                                </RenderElse>
                            </Center>
                            <Flex
                                w='100%'
                                flexDir='column'
                                align='flex-start'
                                justify='center'
                            >
                                <Text as='span' w='100%' textAlign='left' fontSize='0.875rem' color='gray.500'>
                                    {name}
                                </Text>
                                <Text as='span' w='100%' textAlign='left' fontSize='0.675rem' fontWeight='thin' color='gray.500'>
                                    {extension.toUpperCase()} • {FORMAT.fileSize(fileSize, fileSizeUnit, 3)}
                                </Text>
                            </Flex>
                        </Flex>
                    </RenderIf>
                    <RenderIf condition={size === 'large'}>
                        <embed
                            width='100%'
                            height='450px'
                            src={data as string}
                            style={{
                                borderRadius: '10px',
                                border: 'none',
                            }}
                        />
                    </RenderIf>
                </RenderIf >
                <RenderIf condition={isError}>
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
                            as={FaRegFilePdf}
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
                            Não foi possível carregar o documento
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
                </RenderIf>
            </Loadable>
        </Box>
    );
}