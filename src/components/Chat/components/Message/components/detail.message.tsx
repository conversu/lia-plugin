import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";

import { RenderIf } from "@components/utils/RenderIf";
import { MessageRole } from "@services/chat/chat.type";

import { LuCheck, LuCheckCheck, LuClock } from "react-icons/lu";

import { useMessageContext } from "../provider/message.hook";


interface Props {
    datePattern?: string;
}


export default function MessageDetail({
    datePattern = 'HH:mm'
}: Props) {

    const {
        color,
        isAssistant,
        isSeen,
        message,
        role,
        theme
    } = useMessageContext();

    function getIcon() {

        if (!!message.status && message.status === 'WAITING') {

            return LuClock;
        }

        if (isAssistant || isSeen) {
            return LuCheckCheck;
        }

        return LuCheck;
    }

    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify='flex-end'
            gap='0.5rem'
            mt={!message.content || message.content.length === 0 ? '-0.5rem' : '-1.5rem'}
        >
            <Text
                as='time'
                color={color}
                textAlign='right'
                fontSize='0.6rem'
            >
                {format(new Date(message.sentAt), datePattern)}
            </Text>
            <RenderIf condition={role === MessageRole.USER}>
                <Tooltip
                    label={isAssistant || isSeen ? 'Lida' : 'Não lida'}
                    bg={theme.color}
                    color={theme.bg}
                    rounded='lg'
                    hasArrow
                    placement='bottom'
                    size='xs'
                    fontSize='0.6rem'
                >
                    <Box>
                        <Icon
                            as={getIcon()}
                            cursor='pointer'
                            fontSize={!!message.status && message.status === 'WAITING' ? '0.675rem' : '0.85rem'}
                            color={color}
                        />
                    </Box>
                </Tooltip>
            </RenderIf>
        </Flex>
    );
}