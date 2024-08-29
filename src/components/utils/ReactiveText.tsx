import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
    text: string;
}


export function ReactiveText({ text, ...rest }: Props) {

    const isHeader = text.startsWith('###');
    const parts = isHeader ? [text.replace('### ', '')] : text.split(/(\*\*[^*]+\*\*)/g);

    return (
        <Text
            fontWeight={isHeader ? 'bold' : 'normal'}
            {...rest}
        >
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    // Remove the ** and make this part bold
                    return (
                        <Text as="span" fontWeight={isHeader ? 'bold' : "semibold"} key={index}>
                            {part.slice(2, -2)}
                        </Text>
                    );
                }
                // Normal text part
                return (
                    <Text as="span" key={index} fontWeight={isHeader ? 'bold' : 'normal'}>
                        {part}
                    </Text>
                );
            })}
        </Text>
    );
}