/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { BoxProps, FlexProps, SkeletonCircle } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { PluginContext } from "./context";

import { Plugin } from "../../components/plugin";
import { ThemeProvider } from "../../theme/theme.provider";
import { IBot } from "../../@types/bot";
import { Error } from "../../components/Error";
import { PluginPosition } from "../../@types/plugin";


interface Props {
    token?: string
    children: ReactNode;
    displayError?: boolean;
    dataSet: any;
    position?: PluginPosition;
}


export function PluginProvider({
    token,
    children,
    displayError = false,
    dataSet,
    position = 'bottom-right'
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

                    let message = 'Falha ao autorizar plugin.';

                    if (err.code === 'ERR_NETWORK') {
                        message = 'Serviço de autorização indisponível ou dispositivo sem conectividade com a internet, por favor, confira sua conexão. Se o problema persistir, contate um administrador.';
                    }

                    switch (err.response?.status) {
                        case 500:
                            message = 'Falha ao autorizar plugin, por favor, contate um administrador.';
                            break;
                        case 404:
                            message = 'Falha ao autorizar plugin, por favor, contate um administrador.';
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
    }, [authorize, token]);


    const containerPositionProps = {
        'bottom-left': {
            bottom: '2',
            left: '2'
        } as Partial<BoxProps>,
        'bottom-right': {
            bottom: '2',
            right: '2'
        } as Partial<BoxProps>,
        'top-right': {
            top: '2',
            right: '2'
        } as Partial<BoxProps>,
        'top-left': {
            top: '2',
            left: '2',
        } as Partial<BoxProps>,
        // 'bottom': {
        //     bottom: '2',
        //     left: '50%'
        // } as Partial<BoxProps>,
        // 'center-right': {
        //     bottom: '50%',
        //     right: '2'
        // } as Partial<BoxProps>,
        // 'center-left': {
        //     bottom: '50%',
        //     left: '2'
        // } as Partial<BoxProps>,
    }

    const contentPositionProps = {
        'bottom-left': {
            flexDir: 'column',
            align: 'flex-start',
            justify: 'flex-end'
        } as Partial<FlexProps>,
        'bottom-right': {
            flexDir: 'column',
            align: 'flex-end',
            justify: 'flex-end'
        } as Partial<FlexProps>,
        'top-right': {
            flexDir: 'column-reverse',
            align: 'flex-end',
            justify: 'flex-start'
        } as Partial<FlexProps>,
        'top-left': {
            flexDir: 'column-reverse',
            align: 'flex-start',
            justify: 'flex-start'
        } as Partial<FlexProps>
    }

    const borderRadius = {
        'bottom-left':  '0.75rem 0.75rem 0.75rem 0',
        'bottom-right':  '0.75rem 0.75rem 0 0.75rem',
        'top-right': '0.75rem 0 0.75rem 0.75rem',
        'top-left': '0 0.75rem 0.75rem 0.75rem'
    }



    if (status === 'authorized') {

        return (
            <PluginContext.Provider value={{
                url: url.current as string,
                bot: bot.current as IBot,
                requester: null,
                containerPositionProps: containerPositionProps[position] ?? containerPositionProps['bottom-right'],
                contentPositionProps: contentPositionProps[position] ?? contentPositionProps['bottom-right'],
                borderRadius: borderRadius[position] ?? borderRadius['bottom-right']
            }}
            >
                {children}
            </PluginContext.Provider>

        );
    }

    if (status === 'loading') {

        return (
            <ThemeProvider>
                <Plugin.Container
                    props={{
                        ...(containerPositionProps[position] ?? containerPositionProps['bottom-right'])
                    }}
                >
                    <SkeletonCircle w='3rem' h='3rem' boxShadow='lg' />
                </Plugin.Container>
            </ThemeProvider>
        )
    }

    if (status === 'error' && displayError) {
        return (
            <Error
                dataSet={dataSet}
                error={error.current}
                onReload={() => authorize(token)}
                props={{
                    ...(containerPositionProps[position] ?? containerPositionProps['bottom-right'])
                }}
            />
        );
    }

    return (<></>)
}