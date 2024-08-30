import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Center, Icon, SkeletonCircle } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { BiError } from "react-icons/bi";
import { PluginContext } from "./context";

import { Plugin } from "@components/plugin";

import { ThemeProvider } from "@theme/theme.provider";

import { IBot } from "../../@types/bot";


interface Props {
    token?: string
    children: ReactNode
}


export function PluginProvider({ token, children }: Props) {

    const bot = useRef<IBot | null>(null);
    const url = useRef<string | null>(null);

    const [status, setStatus] = useState<'loading' | 'error' | 'authorized'>('loading');


    const authorize = useCallback(async (token?: string | null) => {

        if (token) {

            await axios.post('https://lia-plugin.heroku.com/authorize', {
                token
            })
                .then(response => {
                    bot.current = response.data.bot;
                    url.current = response.data.liaEndpoint;
                    setStatus('authorized');
                })
                .catch((err: AxiosError) => {
                    let message = 'Falha ao autorizar plugin'

                    switch (err.response?.status) {
                        case 500:
                            message = 'Falha ao autorizar plugin, por favor, contate um administrador';
                            break;
                        case 404:
                            message = 'Falha ao autorizar plugin, por favor, contate um administrador';
                            break;
                        case 403:
                            message = 'Plugin não autorizado.'
                            break;
                        default:
                            break;
                    }

                    console.error(`[CONVERSU] ${message}`)
                    setStatus('error');
                })
        } else {
            console.error('[CONVERSU] O token precisa ser informado através da propriedade "data-token" dentro da div de id "conversu-plugin".')
            setStatus('error');
        }
    }, []);


    useEffect(() => {
        authorize(token);
    }, [authorize, token])

    if (status === 'authorized') {

        return (
            <PluginContext.Provider value={{
                url: url.current as string,
                bot: bot.current as IBot,
                requester: null
            }}
            >
                {children}
            </PluginContext.Provider>

        );
    }

    if (status === 'loading') {

        return (
            <ThemeProvider>
                <Plugin.Container>
                    <SkeletonCircle w='3rem' h='3rem' />
                </Plugin.Container>
            </ThemeProvider>
        )
    }


    return (
        <ThemeProvider>
            <Plugin.Container>
                <Center w='3rem' h='3rem' bg='red.500' color='white'>
                    <Icon as={BiError} fontSize='1.5rem' />
                </Center>
            </Plugin.Container>
        </ThemeProvider>
    );
}