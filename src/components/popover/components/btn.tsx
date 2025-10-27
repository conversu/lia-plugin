import { Button, Center, Flex, Icon, IconButton, Img, Text } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { TbMessageCircleFilled } from "react-icons/tb";




interface Props {
    type?: 'circle' | 'badge' | 'ghost';
    color?: string;
    icon?: string;
    size?: number;
    allowTooltip?: boolean;
    title?: string;
    tooltip?: string | null;
    tooltipColor?: string | null;
    tooltipBg?: string | null;
}

export default function PopoverButton({
    color = conversuColors.orange,
    type = 'circle',
    icon,
    tooltip,
    tooltipBg,
    tooltipColor,
    allowTooltip = true,
    size = 64,
    title,

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
    const isCircleOrBadge = type === 'badge' || type === 'circle';

    return (
        <Flex
            id='cp-popover-btn'
            w='100%'
            flexDir='column'
            gap='1rem'
            {...contentPositionProps}
        >
            {allowTooltip && showTooltip && (
                <Flex
                    id='cp-btn-tooltip'
                    w={`${popover.width - 24}px`}
                    pl='1rem'
                    py='1rem'
                    flexDir='row'
                    align='flex-start'
                    justify='space-between'
                    borderRadius={borderRadius}
                    boxShadow='lg'
                    bg={tooltipBg || bot.layout.bot.bg}
                    color={tooltipColor || bot.layout.bot.color}
                    gap='.5rem'
                    mr='8px'
                >
                    <Text as='span' w='100%' maxW='200px' textAlign='left'>
                        {bot?.tooltip || tooltip || ''}
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
                                color={tooltipColor || bot.layout.bot.color || 'gray.800'}
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
                    id='cp-open-btn'
                    aria-label="Abrir chat"
                    rounded={type === 'circle' ? 'full' : undefined}
                    w={type === 'badge' ? undefined : `${buttonSize}px`}
                    h={type === 'badge' ? '2rem' : `${buttonSize}px`}
                    borderRadius={type === 'badge' ? '8px 8px 0px 0px' : undefined}
                    onClick={onToggle}
                    color='white'
                    cursor='pointer'
                    colorScheme='gray'
                    bg={isCircleOrBadge ? color : 'transparent'}
                    _hover={{
                        bg: isCircleOrBadge ? color : 'transparent',
                        color: 'white'
                    }}
                    p='.5rem'
                    boxShadow={isCircleOrBadge ? color : 'transparent'}
                    leftIcon={type === 'badge' ? <Icon as={TbMessageCircleFilled} /> : undefined}
                >
                    {type === 'badge' ? (
                        <>{title}</>
                    ) : (
                        <>
                            <Center
                                w='100%'
                                h='100%'
                                maxW={isCircleOrBadge ? `${buttonSize}px` : '2rem'}
                                maxH={isCircleOrBadge ? `${buttonSize}px` : '2rem'}
                            >
                                {
                                    !!icon ? (
                                        <Img
                                            w='100%'
                                            h='100%'
                                            rounded={isCircleOrBadge ? 'full' : undefined}
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
                    id='cp-minimize-btn'
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
                    rightIcon={<Icon as={RiArrowDownDoubleLine} />}
                >
                    minimizar
                </Button>
            )}
        </Flex>
    );
}