/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { SkeletonCircle } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { PluginContext } from "./context";

import { Plugin } from "../../components/plugin";
import { ThemeProvider } from "../../theme/theme.provider";
import { IBot } from "../../@types/bot";
import { Error } from "../../components/Error";


interface Props {
    token?: string
    children: ReactNode;
    displayError?: boolean;
    dataSet: unknown;
}


export function PluginProvider({
    token,
    children,
    displayError = false,
    dataSet
}: Props) {

    const bot = useRef<IBot | null>(null);
    const url = useRef<string | null>(null);
    const error = useRef<string | null>(null);

    const [status, setStatus] = useState<'loading' | 'error' | 'authorized'>('loading');


    const authorize = useCallback(async (token?: string | null) => {
        setStatus('loading');
        if (token) {
            await axios.post(`${process.env.API_ENDPOINT}/plugin/authorize`, {
                token,
                parameters: dataSet
            }, {
                headers: {
                    'x-origin': window.location.href,
                    requester: process.env.API_KEY
                }
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
                    error.current = message;
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
                    <SkeletonCircle w='3rem' h='3rem' boxShadow='lg' />
                </Plugin.Container>
            </ThemeProvider>
        )
    }

    if (status === 'error' && displayError) {
        return (
            <Error
                error={error.current}
                onReload={() => authorize(token)}
            />
        );
    }

    return (<></>)
}