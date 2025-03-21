import { Box, Button, Center, Flex, Icon, IconButton, Img, Text } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";
import React from "react";
import { generateKey } from "../../../utils/utils";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { TbMessageCircleFilled } from "react-icons/tb";




interface Props {
    type?: 'circle' | 'badge';
    color?: string;
    icon?: string;
    tooltip?: string;
    size?: number;
    allowTooltip?: boolean;
    title?: string;
}

export default function PopoverButton({
    color = conversuColors.orange,
    type = 'circle',
    icon,
    tooltip,
    allowTooltip = true,
    size = 64,
    title
}: Props) {

    const {
        isExpanded,
        onToggle,
        isShortVersion,
        contentPositionProps,
        popover,
        borderRadius,
        bot,
        showTooltip,
        onTooltipClose,
    } = usePlugin();

    const buttonSize = size * (isExpanded ? 0.6 : 1) * (isShortVersion ? 0.8 : 1)

    return (
        <Flex
            w='100%'
            flexDir='column'
            gap='1rem'
            {...contentPositionProps}
        >
            {allowTooltip && showTooltip && (
                <Flex
                    w={`${popover.width}px`}
                    pl='1rem'
                    py='1rem'
                    flexDir='row'
                    align='flex-start'
                    justify='space-between'
                    borderRadius={borderRadius}
                    boxShadow='lg'
                    bg={!tooltip ? bot.layout.bot.bg : tooltip}
                    color={!tooltip ? bot.layout.bot.color : 'gray.800'}
                    gap='.5rem'
                    mr={`${Math.floor(buttonSize / 2)}px`}
                >
                    <Text as='span' w='100%' textAlign='left'>
                        {bot?.tooltip?.split('\n').map(i => <React.Fragment key={generateKey()}>{i}<br /></React.Fragment>)}
                    </Text>
                    {!isExpanded && (
                        <Flex w='1.5rem' h='100%' flexDir='column' justify='flex-start' align='flex-end' mt='-1rem'>
                            <IconButton
                                icon={<Icon as={FiX} />}
                                aria-label="Fechar dica"
                                variant='ghost'
                                onClick={onTooltipClose}
                                cursor='pointer'
                                p={0}
                                isRound
                                fontSize='1rem'
                                size='sm'
                                color={bot.layout.bot.color ?? 'gray.800'}
                                colorScheme='whiteAlpha'
                                bg='transparent'
                                _hover={{
                                    border: 'none',
                                    filter: 'brightness(0.8)'
                                }}
                            />
                        </Flex>
                    )}
                </Flex>
            )}
            {!isExpanded && (
                <Button
                    aria-label="Abrir chat"
                    rounded={type === 'circle' ? 'full' : undefined}
                    w={type === 'badge' ? undefined : `${buttonSize}px`}
                    h={type === 'badge' ? '2rem' : `${buttonSize}px`}
                    borderRadius={type === 'badge' ? '8px 8px 0px 0px' : undefined}
                    onClick={onToggle}
                    color='white'
                    cursor='pointer'
                    colorScheme='gray'
                    bg={color}
                    _hover={{
                        bg: color,
                        color: 'white'
                    }}
                    p='.5rem'
                    boxShadow='2xl'
                    leftIcon={type === 'badge' ? <Icon as={TbMessageCircleFilled} /> : undefined}
                >
                    {type === 'badge' ? (
                        <>{title}</>
                    ) : (
                        <>
                            <Center
                                w='100%'
                                h='100%'
                                maxW='2rem'
                                maxH='2rem'
                            >
                                {
                                    !!icon ? (
                                        <Img
                                            w='100%'
                                            h='100%'
                                            rounded='full'
                                            src={icon}
                                        />
                                    ) : (
                                        <Icon
                                            as={isExpanded ? FiX : FiSmile}
                                            fontSize='2rem'
                                        />
                                    )
                                }
                            </Center>
                        </>
                    )}
                </Button>
            )}
            {isExpanded && (
                <Button
                    onClick={onToggle}
                    variant='unstyled'
                    bg={color}
                    w='125px'
                    borderRadius='0px 0px 8px 8px'
                    boxShadow='md'
                    color='white'
                    _hover={{
                        color: 'white',
                        bg: color,
                        filter: 'brightness(0.98)',
                    }}
                    border='none'
                    size='xs'
                >
                    <Flex
                        w='100%'
                        h='100%'
                        flexDir='row'
                        align='center'
                        justify='space-between'
                        px='.25rem'
                    >
                        <Box w='1rem' />
                        <Text w='100%' textAlign='center'>
                            minimizar
                        </Text>
                        <Icon as={RiArrowDownDoubleLine} fontSize='1rem' />
                    </Flex>
                </Button>
            )}
        </Flex>
    );
}