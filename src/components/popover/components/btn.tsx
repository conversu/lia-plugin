import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";
import React from "react";
import { generateKey } from "../../../utils/utils";
import { RiArrowDownDoubleLine } from "react-icons/ri";



interface Props {
    color?: string;
    tooltip?: string;
    size?: number;
    allowTooltip?: boolean;
}

export default function PopoverButton({
    color = conversuColors.orange,
    tooltip,
    allowTooltip = true,
    size = 64
}: Props) {

    const {
        isExpanded,
        onToggle,
        isShortVersion,
        contentPositionProps,
        width,
        borderRadius,
        bot,
        showTooltip,
        onTooltipClose
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
                    w={`${width}px`}
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
                <IconButton
                    icon={
                        <Icon
                            as={isExpanded ? FiX : FiSmile}
                            fontSize={`${buttonSize - 16}px`}
                        />
                    }
                    aria-label="Abrir chat"
                    rounded='full'
                    w={`${buttonSize}px`}
                    h={`${buttonSize}px`}
                    onClick={onToggle}
                    color='white'
                    cursor='pointer'
                    colorScheme='orange'
                    bg={color}
                    _hover={{
                        bg: color,
                        color: 'white'
                    }}
                    boxShadow='2xl'
                />
            )}
            {isExpanded && (
                <Button
                    onClick={onToggle}
                    variant='unstyled'
                    bg='gray.50'
                    w='125px'
                    borderRadius='0px 0px 8px 8px'
                    boxShadow='md'
                    color={bot.layout.colors.primary}
                    _hover={{
                        color: bot.layout.colors.secondary,
                        bg: 'gray.50',
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