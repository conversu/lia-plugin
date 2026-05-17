import { Box, Center, Flex, Icon, SlideFade, useColorModeValue } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { usePlugin } from "../../../services/plugin/hook";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { conversuColors } from "../../../theme/theme.global";



interface Props {
    children: ReactNode;
    border?: string;
    color?: string;
}


function ExpandButton({ color }: { color: string; }) {

    const { onMaximizeToggle, isMaximized, allowExpand } = usePlugin();


    const [isHovered, setIsHovered] = useState(false);

    if (!allowExpand) {
        return (<></>)
    }

    return (
        <Center
            w='1.25rem'
            h='200px'
        >
            <Center
                as='button'
                w={isHovered ? '1.25rem' : '1rem'}
                mr='-.5rem'
                zIndex={3000}
                h='4rem'
                color='gray.700'
                bg='gray.100'
                rounded='4px'
                cursor='pointer'
                _hover={{
                    bg: color,
                    color: 'white',
                    mr: isMaximized ? '-1rem' : '-.25rem'
                }}
                onClick={onMaximizeToggle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    width: `${isHovered ? '1.25rem' : '1rem'} !important`,
                    height: '4rem !important',
                    backgroundColor: `${isHovered ? color : 'var(--chakra-colors-gray-100)'} !important`,
                    color: `${isHovered ? 'white' : 'var(--chakra-colors-gray-700)'} !important`,
                    borderRadius: '4px !important',
                    border: 'none !important',
                    boxShadow: 'none !important',
                    padding: '0 !important',
                    fontFamily: 'inherit !important',
                    fontSize: 'inherit !important',
                    transform: 'none !important',
                    cursor: 'pointer !important',
                    _hover: {
                        backgroundColor: `${color} !important`,
                        color: 'white !important',
                        transform: 'none !important',
                    },
                }}
            >
                <Icon
                    as={isMaximized ? MdKeyboardArrowRight : MdKeyboardArrowLeft}
                    fontSize={isHovered ? '1.5rem' : '0.75rem'}
                />
            </Center>
        </Center>
    );
}

function Content({ children, border, color = conversuColors.orange }: Props) {

    const {
        borderRadius,
        isShortVersion,
        isExpanded,
        popover,
        isMaximized,
        allowExpand
    } = usePlugin();

    return (
        <Box w='100%' h='100%'>
            <SlideFade in={isExpanded} offsetY='1rem'>
                <Flex
                    w='100%'
                    h='100%'
                    flexDir='row'
                    align='center'
                    justify={{
                        base: 'center',
                        sm: 'center',
                        md: 'flex-end',
                        lg: 'flex-end',
                        xl: 'flex-end'
                    }}
                >
                    {allowExpand && (
                        <ExpandButton color={color} />
                    )}
                    <Flex
                        w={isShortVersion ? `${popover.width - (isMaximized ? 32 : 16)}px` : isMaximized ? '90%' : '100%'}
                        h='96vh'
                        maxH={popover.height}
                        flexDir='column'
                        align='center'
                        justify='space-between'
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        borderRadius={borderRadius}
                        boxShadow='lg'
                        borderColor={useColorModeValue(border ? border : 'gray.100', border ? border : 'gray.800')}
                        borderWidth={border === 'none' ? '0px' : '1px'}
                        borderStyle='solid'
                    >
                        {children}
                    </Flex>
                </Flex>
            </SlideFade>
        </Box>
    );
}


export default function PopoverContent(props: Props) {

    const { isExpanded } = usePlugin();

    if (isExpanded) {

        return (<Content {...props} />)
    }

    return (<></>);
}