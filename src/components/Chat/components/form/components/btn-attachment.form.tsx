import { Center, Flex, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { RenderIf } from "@components/utils/RenderIf";

import { IoDocumentOutline } from "react-icons/io5";
import { LuImage } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";

import { useTheme } from "@theme/theme.hook";

import { useCurrentBot } from "@services/bot/bot.hook";
import { InputType } from "@services/chat/chat.type";
import { useInteraction } from "@services/interaction/interaction.hook";

import { useChatForm } from "../provider/hook.form";


interface Props {
    renderIf?: boolean;
}

export function AttachmentButton({
    renderIf = true
}: Props) {

    const { bot } = useCurrentBot();
    const { isDarkTheme } = useTheme();
    const { handleAttachmentClick, showAttachment } = useChatForm();

    const { interaction } = useInteraction();

    const allowImage = bot?.config?.custom?.find(config => config.name.toUpperCase() === 'IMAGE')?.allowed || interaction?.hasAgent;
    const allowDocument = bot?.config?.custom?.find(config => config.name.toUpperCase() === 'DOCUMENT')?.allowed || interaction?.hasAgent;

    if (!renderIf) {

        return (<></>);
    }

    return (
        <RenderIf condition={showAttachment && (allowImage || allowDocument)}>
            <Flex
                w={{
                    base: '2.5rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '3rem',
                    xl: '3rem'
                }}
                h={{
                    base: '2.5rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '3rem',
                    xl: '3rem'
                }}
                pr={{
                    base: '0.5rem',
                    sm: '0.5rem',
                    md: '1rem',
                    lg: '1rem',
                    xl: '1rem'
                }}
                flexDir='column'
                align='flex-end'
                justify='center'
            >
                <Menu
                    gutter={5}

                >
                    <MenuButton
                        as={Button.Custom}
                        colorScheme={isDarkTheme ? 'blackAlpha' : 'gray'}
                        aria-label="Attach file"
                        size='xs'
                        w='2rem'
                        h='2rem'
                        borderRadius='50%'
                        variant='ghost'
                        color={isDarkTheme ? 'white' : 'gray.400'}
                        fontSize={{
                            base: '1rem',
                            sm: '1rem',
                            md: '1.25rem',
                            lg: '1.25rem',
                            xl: '1.25rem'
                        }}
                        _hover={{
                            color: bot.layout.colors.primary,
                            bg: isDarkTheme ? 'gray.300' : 'gray.50',
                            fontSize: '1.35rem'
                        }}
                    >
                        <Center w='100%' h='100%'>
                            <Icon as={MdAttachFile} />
                        </Center>
                    </MenuButton>
                    <MenuList
                        bg={isDarkTheme ? 'gray.700' : 'white'}
                        borderColor={isDarkTheme ? 'gray.800' : 'gray.200'}
                        zIndex={300}

                    >
                        <RenderIf condition={allowImage}>
                            <MenuItem
                                icon={<Icon as={LuImage} />}
                                onClick={() => handleAttachmentClick(InputType.IMAGE)}
                                bg='transparent'
                                _hover={{
                                    bg: isDarkTheme ? 'gray.800' : 'gray.50',
                                    color: bot.layout.colors.secondary
                                }}
                            >
                                Imagem
                            </MenuItem>
                        </RenderIf>
                        <RenderIf condition={allowDocument}>
                            <MenuItem
                                icon={<Icon as={IoDocumentOutline} />}
                                onClick={() => handleAttachmentClick(InputType.TEXT)}
                                bg='transparent'
                                _hover={{
                                    bg: isDarkTheme ? 'gray.800' : 'gray.50',
                                    color: bot.layout.colors.secondary
                                }}
                            >
                                Documento
                            </MenuItem>
                        </RenderIf>
                    </MenuList>
                </Menu>
            </Flex>
        </RenderIf>
    );
}