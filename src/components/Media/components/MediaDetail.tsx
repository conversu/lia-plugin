import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { FORMAT } from "@conversu/commons";


interface Props {
    name?: string;
    size?: number;
    color: string;
    props?: FlexProps;
}


export default function MediaDetail({ name = 'anexo', size = 0, color, props }: Props) {



    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify='space-between'
            gap={{
                base: '.5rem',
                sm: '.5rem',
                md: '1rem',
                lg: '1rem',
                xl: '1rem'
            }}
            px='.5rem'
            {...props}
        >
            <Text
                as='span'
                w='100%'
                textAlign={{
                    base: 'center',
                    sm: 'center',
                    md: 'left',
                    lg: 'left',
                    xl: 'left'
                }}
                fontSize='0.875rem'
                color={color}
            >
                {name}
            </Text>
            <Text
                as='span'
                w='100%'
                textAlign={{
                    base: 'center',
                    sm: 'center',
                    md: 'right',
                    lg: 'right',
                    xl: 'right'
                }}
                fontSize='0.675rem'
                fontWeight='thin'
                color={color}
            >
                {FORMAT.fileSize(size, 'Mb', 3)}
            </Text>
        </Flex>
    );
}