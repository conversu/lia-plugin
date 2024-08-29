import { Helmet } from 'react-helmet-async';


import { useInteraction } from '@services/interaction/interaction.hook';
import { useCurrentBot } from '@services/bot/bot.hook';
import { useChat } from '@services/chat/chat.hook';



export function ChatHead() {

  const { partner, bot } = useCurrentBot();
  const { interaction } = useInteraction();
  const { isTyping } = useChat();

  let name = interaction?.hasAgent ? interaction.agent?.nickname : bot.nickname;

  return (
      <Helmet>
        {isTyping ? (
          <title>{name} está digitando...</title>
        ) : (
          <title>{partner.company}</title>
        )}
      </Helmet>
  );
}