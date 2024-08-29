import { ReactNode, useEffect } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { generateKey, isIOS, isMobileDevice, range } from '@utils/utils';
import { TypingAnimation } from "@components/animation/TypingAnimation";
import { RenderElse } from "@components/utils/RenderElse";
import { RenderIf } from "@components/utils/RenderIf";
import { useInteraction } from "@services/interaction/interaction.hook";
import { useCurrentBot } from "@services/bot/bot.hook";
import { MessageRole } from "@services/chat/chat.type";
import { useChat } from "@services/chat/chat.hook";
import { useScrollbar } from "@hooks/useScrollbar";



interface Props {
    children: ReactNode;
}

export function ChatContent({ children }: Props) {


    const {
        interaction
    } = useInteraction();

    const {
        bot
    } = useCurrentBot();

    const {
        messages,
        isTyping,
        isLoadingMessages,
        hasUserMessage,
        hasAgent,
        isInputFocused
    } = useChat();

    const { scrollProps } = useScrollbar();


    function scrollToBottom() {
        const element = document.getElementById("chat-end");
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    useEffect(() => {
        if (hasUserMessage) {
            if (isMobileDevice() && !isIOS()) {
                window.scrollTo(0, 1);
            }
            scrollToBottom();
        }
    }, [messages, isTyping, isInputFocused]);

    return (
        <Flex
            w='100%'
            h='100%'
            maxH={{
                base: isMobileDevice() ? 'calc(100vh - 12rem)' : '83vh',
                sm: isMobileDevice() ? 'calc(100vh - 12rem)' : '83vh',
                md: !!bot.disclaimer ? 'calc(80vh - 2.5rem)' : '80vh',
                lg: !!bot.disclaimer ? 'calc(78.5vh - 2.5rem)' : '78.5vh',
                xl: !!bot.disclaimer ? 'calc(78.5vh - 2.5rem)' : '78.5vh'
            }}
            flexDir='column'
            align='center'
            justify='flex-start'
        >
            <Flex
                w='100%'
                h='100%'
                flexDir='column'
                align='center'
                justify='flex-start'
                overflowX='hidden'
                overflowY='auto'
                css={{
                    ...scrollProps
                }}
            >
                <Flex
                    w='100%'
                    flexDir='column'
                    align='center'
                    justify='flex-start'
                    gap='1rem'
                    px={{
                        base: '0.5rem',
                        sm: '0.5rem',
                        md: '2rem'
                    }}
                    pt='1rem'
                >
                    <RenderIf condition={isLoadingMessages}>
                        {range(0, 3).map(item => (
                            <Flex
                                w='100%'
                                flexDir='row'
                                align='center'
                                justify={item % 2 === 0 ? 'flex-start' : 'flex-end'}
                                pb='1rem'
                                key={generateKey()}
                            >
                                <Skeleton w='80%' maxW='400px' rounded='xl' h='4rem' />
                            </Flex>
                        ))}
                    </RenderIf>
                    <RenderElse condition={isLoadingMessages}>
                        {children}
                        <RenderIf condition={isTyping && !hasAgent}>
                            <TypingAnimation
                                style={bot.layout}
                                role={hasAgent ? MessageRole.AGENT : MessageRole.BOT}
                                logo={bot.icon}
                                name={hasAgent ? interaction?.agent?.nickname ?? 'Atendente' : bot.nickname}
                                company={interaction?.partner.company ?? 'Conversu'}
                                withIcon={messages.length <= 1 || messages[messages.length - 1].role === MessageRole.USER}
                            />
                        </RenderIf>
                    </RenderElse>
                    <Box id='chat-end' className='w-full' h='1rem'/>
                </Flex>
            </Flex >
        </Flex>
    );
}