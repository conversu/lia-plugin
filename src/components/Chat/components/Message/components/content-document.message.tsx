import { ReactNode, useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";


import { MediaPreview } from "@components/Media";
import { MessageContentType } from "@services/chat/chat.type";

import { useMessageContext } from "../provider/message.hook";
import MessageContent from "./content.message";
import MessageTextContent from "./text.message";
import { isMobileDevice } from "@utils/utils";
import { downloadPdf } from "@utils/functions";




interface Props {
    children?: ReactNode;
}


export default function DocumentMessage({ children }: Props) {

    const toast = useToast();

    const { isOpen, onClose, onOpen } = useDisclosure();
    const { color, bg, message } = useMessageContext();

    const [isDownloading, setIsDownloading] = useState(false);

    async function handleDetail() {

        if (isMobileDevice()) {
            setIsDownloading(true);
            try {
                if (!!message.media) {
                    const response = await fetch(message?.media.url as string);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const blob = await response.blob();
                    downloadPdf(blob, message.media.originalName);
                }
            } catch (error) {

                toast({
                    status: 'error',
                    title: 'Ops!',
                    description: 'Não foi possível realizar download.',
                    duration: 2000,
                    position: 'bottom',
                    isClosable: true,
                })
            }
            setIsDownloading(false);
        } else {
            onOpen();
        }
    }

    if (message.contentType !== MessageContentType.DOCUMENT) {

        return (<></>);
    }

    return (
        <MessageContent>
            <MediaPreview.Media.DOCUMENT
                src={message.media?.url as string}
                color={color}
                onClick={handleDetail}
                extension={message.media?.extension}
                name={message.media?.originalName}
                fileSize={message.media?.size}
                size='small'
                isDownloading={isDownloading}
                isSynchronizing={message.status === 'WAITING' || !message.media}
            />
            <MessageTextContent />
            {children}
            <MediaPreview.Container.Modal
                isOpen={isOpen}
                onClose={onClose}
                bg={bg}
                color={color}
            >
                <MediaPreview.Media.DOCUMENT
                    src={message.media?.url as string}
                    size='large'
                    extension={message.media?.extension}
                    name={message.media?.originalName}
                    fileSize={message.media?.size}
                />
                <MediaPreview.Detail
                    color={color}
                    name={message.media?.originalName ?? 'anexo'}
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