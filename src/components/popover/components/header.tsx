import { Center, Flex, Grid, Icon, IconButton, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { usePopoverContext } from "../provider/hook";


interface Props {
    title: string;
    subtitle?: string;
}
export default function PopoverHeader({ title, subtitle }: Props) {

    const { onToggle } = usePopoverContext();

    return (
        <Center w='100%' px='.5rem' id='popover-header'>
            <Grid
                w='100%'
                templateColumns='1fr 6fr 1fr'
                borderBottomWidth='1px'
                borderBottomStyle='solid'
                borderBottomColor='gray.100'
            >
                <Flex
                    w='100%'
                    flexDir='row'
                    align='flex-start'
                    justify='flex-start'
                >

                </Flex>
                <Flex w='100%' flexDir='column' align='center' justify='center' gap='.5rem' py='.5rem'>
                    <Text
                        as='h1'
                        fontSize={{
                            base: '1.25rem',
                            sm: '1.25rem',
                            md: '1.25rem',
                            lg: '1.5rem',
                            xl: '1.5rem'
                        }}
                        fontWeight='bold'
                        w='100%'
                        textAlign='center'
                    >
                        {title}
                    </Text>
                    {!!subtitle && (
                        <Text as='p' w='100%' textAlign='center'>
                            {subtitle}
                        </Text>
                    )}
                </Flex>
                <Flex
                    w='100%'
                    flexDir='row'
                    align='flex-start'
                    justify='flex-end'
                >
                    <IconButton
                        icon={<Icon as={FiX} fontSize='1.5rem' />}
                        aria-label="Open"
                        rounded='full'
                        size='sm'
                        variant='ghost'
                        onClick={onToggle}
                        color='white'
                        cursor='pointer'
                        colorScheme='purple'
                        _hover={{
                            bg: 'transparent',
                            border: 'none',
                            color: 'app.orange'
                        }}
                    />
                </Flex>
            </Grid>
        </Center>
    );
}