import { ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { MediaPreview } from "@components/Media";
import { MessageContentType } from "@services/chat/chat.type";

import { useMessageContext } from "../provider/message.hook";
import MessageContent from "./content.message";
import MessageTextContent from "./text.message";



interface Props {
    children: ReactNode;
}


export default function ImageMessage({ children }: Props) {

    const { isOpen, onClose, onOpen } = useDisclosure();

    const {
        color,
        bg,
        message
    } = useMessageContext();

    if (message.contentType !== MessageContentType.IMAGE) {

        return (<></>);
    }

    return (
        <MessageContent>
            <MediaPreview.Media.IMAGE
                src={message.media?.url ?? null}
                alt={message.media?.originalName}
                color={color}
                onClick={onOpen}
                isSynchronizing={message.status === 'WAITING'}
            />
            <MessageTextContent />
            {children}
            <MediaPreview.Container.Modal
                isOpen={isOpen}
                onClose={onClose}
                bg={bg}
                color={color}
            >
                <MediaPreview.Media.IMAGE
                    src={message.media?.url as string}
                    alt='media'
                    size='large'
                    containerProps={{
                        maxH: {
                            base: '600px',
                            sm: '600px',
                            md: '550px',
                            lg: '800px',
                            xl: '800px'
                        }
                    }}
                />
                <MediaPreview.Detail
                    color={color}
                    name={message.media?.originalName}
                    size={message.media?.size}
                    props={{
                        flexDir: {
                            base: 'column',
                            sm: 'column',
                            md: 'row',
                            lg: 'row',
                            xl: 'row'
                        },
                        justify: {
                            base: 'center',
                            sm: 'center',
                            md: 'space-between',
                            lg: 'space-between',
                            xl: 'space-between'
                        }
                    }}
                />
            </MediaPreview.Container.Modal>
        </MessageContent>
    );
}