import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";
import React from "react";
import { generateKey } from "../../../utils/utils";


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

    console.log(bot)

    return (
        <Flex flexDir='column' gap='1rem' {...contentPositionProps}>
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
                    color={!tooltip  ? 'gray.800' : bot.layout.bot.color}
                    gap='.5rem'
                    mr={`${Math.floor(buttonSize / 2)}px`}
                >
                    <Text as='span' w='100%' textAlign='left'>
                        {bot?.tooltip?.split('\n').map(i => <React.Fragment key={generateKey()}>{i}<br/></React.Fragment>)}
                    </Text>
                    <Flex w='1.5rem' h='100%' flexDir='column' justify='flex-start' align='flex-end' mt='-1rem'>
                        <IconButton
                            icon={<Icon as={FiX}  />}
                            aria-label="Fechar dica"
                            variant='ghost'
                            onClick={onTooltipClose}
                            cursor='pointer'
                            p={0}
                            isRound
                            fontSize='1rem'
                            size='sm'
                            color={'gray.800' ?? bot.layout.bot.color}
                            colorScheme='whiteAlpha'
                            bg='transparent'
                            _hover={{
                                border: 'none',
                                filter: 'brightness(0.8)'
                            }}
                        />
                    </Flex>
                </Flex>
            )}
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
        </Flex>
    );
}