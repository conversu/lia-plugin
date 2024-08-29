import { Button, Icon } from "@chakra-ui/react";
import { FaLink, FaWhatsapp } from "react-icons/fa";
import { MessageContentType } from "@services/chat/chat.type";
import { useMessageContext } from "../provider/message.hook";
import MessageContent from "./content.message";



export default function LinkMessage() {

    const {
        message,
        color,
        bg
    } = useMessageContext();

    function handleLinkRedirect(link: string) {

        const current = window.location.href.split('/i/')[0].split('/');
        const redirectUrl = `${current[0]}//${current[2]}/${current[3]}/redirect/${btoa(link)}`;
        window.open(redirectUrl, '_blank', 'noopener noreferrer')
    }

    if (message.contentType !== MessageContentType.LINK) {

        return (<></>);
    }

    return (
        <MessageContent
            props={{
                minW: '225px',
                px: '1rem',
                rounded: 'xl',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: color
            }}
        >
            <Button
                bg={bg}
                color={color}
                _hover={{
                    bg: color,
                    color: bg,
                    filter: 'brightness(0.9)'
                }}
                w='100%'
                fontSize='0.85rem'
                size='sm'
                onClick={() => handleLinkRedirect(message.content)}
                leftIcon={message.content.includes('wa.me') ? <Icon as={FaWhatsapp} /> : <Icon as={FaLink} />}
            >
                ACESSAR
            </Button>
        </MessageContent>
    );
}