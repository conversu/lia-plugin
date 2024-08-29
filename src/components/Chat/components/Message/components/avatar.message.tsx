
import { RenderIf } from "@components/utils/RenderIf";
import { useMessageContext } from "../provider/message.hook";
import { useCurrentBot } from "@services/bot/bot.hook";
import { Avatar } from "../../Avatar";


interface Props {
}

export default function MessageAvatar({ }: Props) {

    const { bot } = useCurrentBot();

    const {
        role,
        agent,
        style,
        withIcon
    } = useMessageContext();

    return (
        <RenderIf condition={withIcon}>
            <Avatar.AGENT
                role={role}
                logo={agent?.logo}
                alt={!agent?.nickname ? bot.partner.company : agent?.nickname}
                name={agent?.nickname ?? 'Atendente'}
                style={style}
            />
            <Avatar.BOT
                role={role}
                alt={bot.partner.company}
                name={bot.nickname}
                style={style}
            />
            <Avatar.USER
                role={role}
                style={style}
            />
        </RenderIf>
    );
}