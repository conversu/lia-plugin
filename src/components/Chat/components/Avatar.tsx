import { Center, Flex, Icon, Text, Avatar as ChakraAvatar, Img } from "@chakra-ui/react";

import { RiUser4Fill, RiUserSmileFill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";


import { RenderElse } from "@components/utils/RenderElse";
import { RenderIf } from "@components/utils/RenderIf";
import { IMessageRole, IMessageStyleType, MessageRole } from "@services/chat/chat.type";


import { useCurrentBot } from "@services/bot/bot.hook";
import { useTheme } from "@theme/theme.hook";


interface BaseProps {
    style: IMessageStyleType;
    role: IMessageRole;
}


interface NotUserProps extends BaseProps {
    logo?: string;
    alt: string;
    name: string;
}

const avatarSize = {
    base: '1.25rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.5rem',
    xl: '1.5rem'
}

const avatarPadding = {
    base: '.25rem',
    sm: '.25rem',
    md: '.5rem',
    lg: '.5rem',
    xl: '.5rem'
}

const avatarTextSize = {
    base: '0.875rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1rem',
    xl: '1rem'
}



function BotAvatar({ name, style, role }: NotUserProps) {

    const { isDarkTheme } = useTheme();
    const { bot } = useCurrentBot();

    if (role !== MessageRole.BOT) {
        return (<></>)
    }

    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify='start'
            gap='1rem'
        >
            <Center
                p={!!bot.icon ? '2px' : avatarPadding}
                color={isDarkTheme ? style.bot.color : 'white'}
                rounded='full'
                bg={isDarkTheme ? style.bot.bg : style.bot.color}
            >
                <RenderIf condition={!bot.icon}>
                    <Icon
                        as={RiUserSmileFill}
                        fontSize={avatarSize}
                    />
                </RenderIf>
                <RenderIf condition={!!bot.icon}>
                    <Center
                        w={{
                            base: '1.5rem',
                            sm: '1.5rem',
                            md: '2rem',
                            lg: '2rem',
                            xl: '2rem'
                        }}
                        h={{
                            base: '1.5rem',
                            sm: '1.5rem',
                            md: '2rem',
                            lg: '2rem',
                            xl: '2rem'
                        }}
                    >
                        <Img
                            w='100%'
                            borderRadius='100%'
                            src={bot.icon}
                            alt={bot.nickname}
                        />
                    </Center>
                </RenderIf>
            </Center>
            <Text
                as='span'
                w='100%'
                textAlign='left'
                fontWeight='semibold'
                color={isDarkTheme ? style.bot.bg : style.bot.color}
                fontSize={avatarTextSize}
            >
                {name}
            </Text>
        </Flex>
    );
}

function AgentAvatar({ logo, alt, name, style, role }: NotUserProps) {

    const { isDarkTheme } = useTheme();

    const finalStyle = !!style.agent ? style.agent : style.bot;


    if (role !== MessageRole.AGENT) {
        return (<></>)
    }

    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify='start'
            gap='1rem'
        >
            <RenderIf condition={!!logo}>
                <Flex
                    w='2rem'
                    h='2rem'
                    borderRadius='100%'
                    flexDir='column'
                    align='center'
                    justify='center'
                    bg={isDarkTheme ? finalStyle.bg : 'white'}
                >
                    <ChakraAvatar
                        w='2rem'
                        h='2rem'
                        bg={finalStyle.bg}
                        name={alt}
                        src={logo as string}
                    />
                </Flex>
            </RenderIf>
            <RenderElse condition={!!logo}>
                <Flex
                    p={avatarPadding}
                    rounded='full'
                    color={isDarkTheme ? finalStyle.color : 'white'}
                    bg={isDarkTheme ? finalStyle.bg : finalStyle.color}
                >
                    <Icon
                        as={MdOutlineSupportAgent}
                        fontSize={avatarSize}
                    />
                </Flex>
            </RenderElse>
            <Text
                as='span'
                w='100%'
                textAlign='left'
                fontWeight='semibold'
                color={isDarkTheme ? finalStyle.bg : finalStyle.color}
                fontSize={avatarTextSize}
            >
                <RenderIf condition={name.toLowerCase() !== 'atendente'}><Text as='span' fontWeight='extrabold'>(Atendente)</Text></RenderIf> {name}
            </Text>
        </Flex>
    );
}


function UserAvatar({ role, style }: BaseProps) {

    const { isDarkTheme } = useTheme();

    if (role !== MessageRole.USER) {
        return (<></>)
    }

    return (
        <Flex
            w='100%'
            flexDir='row'
            align='center'
            justify='end'
            gap='1rem'
        >
            <Text
                w='100%'
                textAlign='right'
                fontWeight='semibold'
                color={isDarkTheme ? style.user.bg : style.user.color}
                fontSize={avatarTextSize}
            >
                Você
            </Text>
            <Flex
                p={avatarPadding}
                rounded='full'
                color={isDarkTheme ? style.user.color : 'white'}
                bg={isDarkTheme ? style.user.bg : style.user.color}
            >
                <Icon
                    as={RiUser4Fill}
                    fontSize={avatarSize}
                />
            </Flex>
        </Flex>
    );
}


export const Avatar = {
    BOT: BotAvatar,
    USER: UserAvatar,
    AGENT: AgentAvatar
}