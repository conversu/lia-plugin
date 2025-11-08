import { Box, Button, ButtonProps, Center, CenterProps, Flex, Icon, IconButton, Img, ImgProps, Text } from "@chakra-ui/react";
import { FiSmile, FiX } from "react-icons/fi";
import { conversuColors } from "../../../theme/theme.global";
import { usePlugin } from "../../../services/plugin/hook";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { TbMessageCircleFilled } from "react-icons/tb";
import MarkdownRenderer from "../../Markdown";




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
    img?: {
        width: string;
        height: string;
    }
}

export default function PopoverButton({
    color = conversuColors.orange,
    type = 'circle',
    icon,
    tooltipBg,
    tooltipColor,
    allowTooltip = true,
    size = 64,
    title,
    img
}: Props) {

    const {
        isExpanded,
        onToggle,
        isShortVersion,
        contentPositionProps,
        borderRadius,
        bot,
        showTooltip,
        onTooltipClose,
        tooltip
    } = usePlugin();

    const buttonSize = size * (isExpanded ? 0.6 : 1) * (isShortVersion ? 0.8 : 1)

    const style: Record<'badge' | 'circle' | 'ghost', ButtonProps> = {
        'badge': {
            w: undefined,
            h: '2rem',
            borderRadius: '8px 8px 0px 0px',
            leftIcon: <Icon as={TbMessageCircleFilled} />,
            bg: color,
            boxShadow: color === 'transparent' ? undefined : 'lg',
            _hover: {
                bg: color,
                color: 'white'
            },
            rounded: undefined,
            p: '.5rem',
        },
        'circle': {
            w: `${buttonSize}px`,
            h: `${buttonSize}px`,
            bg: color,
            boxShadow: color === 'transparent' ? undefined : 'lg',
            _hover: {
                bg: color,
                color: 'white'
            },
            rounded: 'full',
            p: '.5rem'
        },
        'ghost': {
            bg: 'transparent',
            p: '0.25rem',
            _hover: {
                bg: 'transparent',
                color: 'transparent'
            },
            variant: 'ghost',
            mb: '1rem'
        }
    }


    const centerProps: Record<'badge' | 'circle' | 'ghost', CenterProps> = {
        'badge': {},
        'circle': {
            maxW: `${buttonSize}px`,
            maxH: `${buttonSize}px`
        },
        'ghost': {
            mb: '1rem',
        }
    }

    const imgProps: Record<'badge' | 'circle' | 'ghost', ImgProps> = {
        'badge': {

        },
        'circle': {
            rounded: 'full',
            minW: 32,
            minH: 32
        },
        'ghost': {
            minW: img?.width,
            minH: img?.height
        }
    }



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
                    w='350px'
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
                    mr={type === 'ghost' ? img?.width ? Math.floor(Number(img.width) / 2) : '32px' : '8px'}
                    mb={type === 'ghost' ? img?.height ? `${Number(img.height) * 1.75}px` : '32px' : undefined}
                >
                    <Box w='100%' maxW='250px'>
                        {tooltip && tooltip.length > 0 && (
                            <MarkdownRenderer
                                content={tooltip}
                            />
                        )}
                    </Box>
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
                    onClick={onToggle}
                    color='white'
                    cursor='pointer'
                    colorScheme='gray'
                    {...style[type]}
                >
                    {type === 'badge' ? (
                        <>{title}</>
                    ) : (
                        <>
                            <Center
                                w='100%'
                                h='100%'
                                {...centerProps[type]}
                            >
                                {
                                    !!icon ? (
                                        <Img
                                            w='100%'
                                            h='100%'
                                            src={icon}
                                            {...imgProps[type]}
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
                    bg={color === 'transparent' ? '#000' : color}
                    w='125px'
                    borderRadius='0px 0px 8px 8px'
                    boxShadow='md'
                    color='white'
                    _hover={{
                        color: 'white',
                        bg: color === 'transparent' ? '#000' : color,
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