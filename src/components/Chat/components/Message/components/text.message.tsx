import { TextProps } from "@chakra-ui/react";
import { ReactiveText } from "@components/utils/ReactiveText";
import { useMessageContext } from "../provider/message.hook";



interface Props {
    props?: TextProps;
}


export default function MessageTextContent({ props }: Props) {

    const { message, color } = useMessageContext();

    if (!message.content) {

        return (<></>);
    }

    return (
        <ReactiveText
            text={message.content}
            as='span'
            w='100%'
            textAlign='left'
            p='0.5rem'
            color={color}
            fontSize={{
                base: '0.875rem',
                sm: '0.875rem',
                md: '1rem',
                lg: '1rem',
                xl: '1rem'
            }}
            {...props}
        />
    );
}