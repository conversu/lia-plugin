import { Box, Center, Flex, Icon, Img, SimpleGrid, Tooltip, useDisclosure } from "@chakra-ui/react";

import { FiTrash } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdImageSearch } from "react-icons/md";

import { Button } from "@components/Button";
import { RenderIf } from "@components/utils/RenderIf";
import { RenderElse } from "@components/utils/RenderElse";
import { MediaPreview } from "@components/Media";

import { useCurrentBot } from "@services/bot/bot.hook";

import { isMobileDevice } from "@utils/utils";
import { useTheme } from "@theme/theme.hook";

import { useChatForm } from "../provider/hook.form";


export function InputFilePreview() {

    const {
        attachment,
        handleResetAttachment,
        hasPreview
    } = useChatForm();

    const { isDarkTheme } = useTheme();
    const { bot } = useCurrentBot();

    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleAttachmentDetail() {

        const isImage = attachment?.type.startsWith('image');
        if (isImage) {
            onOpen();
        }
    }

    return (
        <RenderIf condition={hasPreview}>
            <Flex
                w='100%'
                h='216px'
                flexDir='column'
                align='center'
                justify='flex-end'
                gap='1rem'
                rounded='lg'
            >
                <SimpleGrid
                    w='100%'
                    templateColumns='1fr 14fr 1fr'
                    spacing='1rem'
                    bg={isDarkTheme ? 'gray.100' : 'gray.100'}
                    borderRadius='6px 6px 0px 0px'
                    p='0.5rem'
                >
                    <Box w='2rem' />
                    <Center w='100%' h='200px'>
                        <RenderIf condition={attachment?.type.startsWith('image')}>
                            <Img
                                src={attachment?.src as string}
                                alt='preview'
                                maxW='100%'
                                h='100%'
                                maxH='200px'
                            />
                        </RenderIf>
                        <RenderElse condition={attachment?.type.startsWith('image')}>
                            <RenderIf condition={isMobileDevice()}>
                                <MediaPreview.Media.DOCUMENT
                                    src={attachment?.src as string}
                                    color='white'
                                    extension={attachment?.type}
                                    name={attachment?.name}
                                    fileSize={attachment?.size}
                                    size='small'
                                />
                            </RenderIf>
                            <RenderElse condition={isMobileDevice()}>
                                <embed
                                    width='100%'
                                    height='100%'
                                    src={attachment?.src as string}
                                    style={{
                                        'borderRadius': '10px',
                                        'border': 'none'
                                    }}
                                />
                            </RenderElse>
                        </RenderElse>
                    </Center>
                    <Flex
                        h='100%'
                        flexDir='column'
                        align='flex-end'
                        justify='space-between'
                    >
                        <Tooltip
                            color='white'
                            bg='red.500'
                            label='Remover anexo'
                            placement='bottom'
                            rounded='full'
                            hasArrow
                        >
                            <Button.Custom
                                p='0.5rem'
                                size='sm'
                                variant='ghost'
                                color='gray.500'
                                rounded='full'
                                _hover={{
                                    bg: 'red.500',
                                    variant: 'solid',
                                    color: 'white'
                                }}
                                onClick={handleResetAttachment}
                            >
                                <Icon as={FiTrash} fontSize='1.15rem' />
                            </Button.Custom>
                        </Tooltip>
                        <Tooltip
                            color='white'
                            bg={bot.layout.colors.primary}
                            label='Ver anexo'
                            placement='bottom'
                            rounded='full'
                            hasArrow
                        >
                            <Button.Custom
                                p='0.5rem'
                                size='sm'
                                variant='ghost'
                                color='gray.500'
                                rounded='full'
                                _hover={{
                                    bg: bot.layout.colors.primary,
                                    variant: 'solid',
                                    color: 'white'
                                }}
                                onClick={handleAttachmentDetail}
                                isDisabled={!attachment}
                            >
                                <Icon
                                    as={attachment?.type.startsWith('image') ? MdImageSearch : HiOutlineDocumentSearch}
                                    fontSize='1.15rem'
                                />
                            </Button.Custom>
                        </Tooltip>
                    </Flex>
                </SimpleGrid>
                <MediaPreview.Container.Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    bg={isDarkTheme ? 'gray.600' : 'gray.100'}
                >
                    <MediaPreview.Media.IMAGE
                        src={attachment?.src as string}
                        size='large'
                        renderIf={attachment?.type.startsWith('image')}
                    />
                    <MediaPreview.Detail
                        color={isDarkTheme ? 'gray.300' : 'gray.600'}
                        size={attachment?.size}
                        name={attachment?.name}
                    />
                </MediaPreview.Container.Modal>
            </Flex>
        </RenderIf>
    );
}