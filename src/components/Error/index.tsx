import { BoxProps, Button, Center, Flex, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text } from "@chakra-ui/react";
import { ThemeProvider } from "../../theme/theme.provider";
import { Plugin } from "../plugin";
import { BiError } from "react-icons/bi";

interface Props {
    error: string | null;
    onReload: (...args: any[]) => any;
    dataSet?: any;
    props?: BoxProps;
}


export function Error({ error, onReload, props }: Props) {


    return (
        <ThemeProvider>
            <Plugin.Container
                props={props}
            >
                <Popover>
                    <PopoverTrigger>
                        <Button
                            w='3rem'
                            h='3rem'
                            bg='red.500'
                            color='white'
                            rounded='full'
                            boxShadow='lg'
                            cursor='pointer'
                            colorScheme='red'
                        >
                            <Center w='100%' h='100%'>
                                <Icon as={BiError} fontSize='1.5rem' />
                            </Center>
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent border='none'>
                            <PopoverArrow bg='red.500' borderColor='red.500' />
                            <PopoverHeader bg='red.500' color='white' border='none' fontWeight='bold' borderRadius='1rem 1rem 0rem 0rem'>
                                Conversu Plugin
                            </PopoverHeader>
                            <PopoverCloseButton color='white' _hover={{ color: 'white', bg: 'red.600' }} />
                            <PopoverBody bg='red.500' color='white' pb='2rem'>
                                <Text
                                    as='p'
                                    w='100%'
                                    textAlign='left'
                                    lineHeight='150%'
                                >
                                    {error}
                                </Text>
                            </PopoverBody>
                            <PopoverFooter bg='red.500' border='none' borderRadius='0rem 0rem 1rem 1rem'>
                                <Flex w='100%' flexDir='row' align='flex-end' justify='flex-end'>
                                    <Button
                                        size='xs'
                                        colorScheme='whiteAlpha'
                                        border='none'
                                        onClick={onReload}
                                    >
                                        RECARREGAR
                                    </Button>
                                </Flex>
                            </PopoverFooter>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </Plugin.Container>
        </ThemeProvider>
    );
}