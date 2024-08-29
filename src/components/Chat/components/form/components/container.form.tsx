import { ReactNode } from "react";
import { format } from "date-fns";

import { Flex, Text } from "@chakra-ui/react";
import { RenderIf } from "@components/utils/RenderIf";

import { useInteraction } from "@services/interaction/interaction.hook";
import { useCurrentBot } from "@services/bot/bot.hook";

import { useChatForm } from "../provider/hook.form";

interface Props {
    children: ReactNode;
}

export function ChatFormContainer({ children }: Props) {

    const { bot } = useCurrentBot();

    const {
        isError,
        error,
        handleSubmit,
        hasPreview,
    } = useChatForm();

    const {
        interaction
    } = useInteraction();

    if (interaction?.status === 'CLOSED') {

        return (
            <Flex
                w='100%'
                h='3rem'
                flexDir='column'
                align='center'
                justify='flex-end'
                gap='4px'
                rounded='lg'
                fontSize={{
                    base: '0.875rem',
                    sm: '0.875rem',
                    md: '1rem',
                    lg: '1rem',
                    xl: '1rem'
                }}
            >
                <Text as='span' fontWeight='semibold'>
                    Atendimento finalizado em
                </Text>
                <Text>
                    {!!interaction.closedAt ? format(new Date(interaction.closedAt), 'dd/MM/yyyy HH:mm:ss') : 'desconhecido'}
                </Text>
            </Flex>
        );
    }

    if (interaction?.status === 'STAND_BY') {

        return (
            <Flex
                w='100%'
                h='3rem'
                flexDir='column'
                align='center'
                justify='flex-end'
                gap='4px'
                rounded='lg'
                fontSize={{
                    base: '0.875rem',
                    sm: '0.875rem',
                    md: '1rem',
                    lg: '1rem',
                    xl: '1rem'
                }}
            >
                <Text as='span' fontWeight='bold' color={bot.layout.colors.secondary}>
                    ATENDIMENTO EM PAUSA
                </Text>
                <Text>
                    Não se preocupe! Iremos lhe notificar via sms e email quando seu atendimento tiver atualizações.
                </Text>
            </Flex>
        );
    }

    return (
        <Flex
            w='100%'
            flexDir='column'
            align='center'
            justify='flex-end'
            gap='4px'
            mt={hasPreview ? '-225px' : undefined}
            rounded='lg'
        >
            <Flex
                as='form'
                w='100%'
                rounded='lg'
                flexDir='row'
                align='flex-end'
                justify='space-between'
                gap='1rem'
                onSubmit={handleSubmit}
            >
                {children}
            </Flex>
            <Flex
                w='100%'
                flexDir='row'
                align='center'
                justify='flex-start'
                h='0.75rem'
                px='0.5rem'
            >
                <RenderIf condition={isError && !!error}>
                    <Text
                        as='span'
                        w='100%'
                        textAlign='left'
                        fontStyle='italic'
                        color='red.500'
                        fontSize='0.75rem'
                    >
                        {error}
                    </Text>
                </RenderIf>
            </Flex>
        </Flex>
    );
}