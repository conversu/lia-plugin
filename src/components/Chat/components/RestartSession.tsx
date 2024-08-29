import { Flex } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { RenderElse } from "@components/utils/RenderElse";
import { useChat } from "@services/chat/chat.hook";
import { useInteraction } from "@services/interaction/interaction.hook";



export function RestartSession() {

    const { handleReset } = useInteraction();
    const { showInput } = useChat();

    return (
        <RenderElse condition={showInput}>
            <Flex
                w='100%'
                flexDir='row'
                align='center'
                justify='center'
                px='1rem'
                pt='1rem'
            >
                <Button.Primary
                    w='80%'
                    h='2rem'
                    rounded='md'
                    alignItems='center'
                    justifyContent='center'
                    cursor='pointer'
                    _hover={{
                        filter: 'brightness(0.9)',
                        opacity: 0.9
                    }}

                    onClick={handleReset}
                >
                    iniciar novo atendimento
                </Button.Primary>
            </Flex>
        </RenderElse>
    );
}