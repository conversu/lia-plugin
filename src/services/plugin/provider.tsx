/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { BoxProps, FlexProps, SkeletonCircle, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { PluginContext } from "./context";

import { Plugin } from "../../components/plugin";
import { IBot } from "../../@types/bot";
import { Error } from "../../components/Error";
import { PluginPosition } from "../../@types/plugin";


interface Props {
    token?: string
    children: ReactNode;
    displayError?: boolean;
    dataSet: any;
    position?: PluginPosition;
    buttonSize?: number;
    height?: string;
    width?: string;
}


export function PluginProvider({
    token,
    children,
    displayError = false,
    dataSet,
    position = 'bottom-right',
    buttonSize = 64,
    height,
    width
}: Props) {

    const bot = useRef<IBot | null>(null);
    const url = useRef<string | null>(null);
    const error = useRef<string | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [status, setStatus] = useState<'loading' | 'error' | 'authorized'>('loading');

    const {isOpen: isTooltipOpen, onClose: onTooltipClose, onOpen: onTooltipOpen} = useDisclosure();


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
                    bot.current = {
                        alias:  response.data.bot.alias,
                        uuid:  response.data.bot.uuid,
                        tooltip:  response.data.bot.tooltip,
                        layout: {
                            agent: JSON.parse(response.data.bot.layout.agent),
                            user: JSON.parse(response.data.bot.layout.user),
                            bot: JSON.parse(response.data.bot.layout.bot),
                            colors: JSON.parse(response.data.bot.layout.colors)
                        }
                    };
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
        onTooltipOpen();
    }, [authorize, token]);

    const isShortVersion = window.innerWidth <= 400;

    const yAxisPosition = isShortVersion ? '1' : '4';
    const xAxisPosition = isShortVersion ? isExpanded ? '0' : '1' : '4';


    const containerPositionProps = {
        'bottom-left': {
            bottom: yAxisPosition,
            left: xAxisPosition
        } as Partial<BoxProps>,
        'bottom-right': {
            bottom: yAxisPosition,
            right: xAxisPosition
        } as Partial<BoxProps>,
        'top-right': {
            top: yAxisPosition,
            right: xAxisPosition
        } as Partial<BoxProps>,
        'top-left': {
            top: yAxisPosition,
            left: xAxisPosition,
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
            align: isShortVersion && isExpanded ? 'center' : 'flex-start',
            justify: 'flex-end'
        } as Partial<FlexProps>,
        'bottom-right': {
            flexDir: 'column',
            align: isShortVersion && isExpanded ? 'center' : 'flex-end',
            justify: 'flex-end'
        } as Partial<FlexProps>,
        'top-right': {
            flexDir: 'column-reverse',
            align: isShortVersion && isExpanded ? 'center' : 'flex-end',
            justify: 'flex-start'
        } as Partial<FlexProps>,
        'top-left': {
            flexDir: 'column-reverse',
            align: isShortVersion && isExpanded ? 'center' : 'flex-start',
            justify: 'flex-start'
        } as Partial<FlexProps>
    }

    const borderRadius = {
        'bottom-left': '0.75rem 0.75rem 0.75rem 0',
        'bottom-right': '0.75rem 0.75rem 0 0.75rem',
        'top-right': '0.75rem 0 0.75rem 0.75rem',
        'top-left': '0 0.75rem 0.75rem 0.75rem'
    }

    function getWidth() {
        if (!isExpanded && !bot?.current?.tooltip) {
            return buttonSize;
        }

        let width = 450
        if (width) {
            width= Number(width)
        }

        if (isShortVersion) {

            width = window.innerWidth
        }
        
        if(!!bot?.current?.tooltip && isTooltipOpen && !isExpanded){

            return width * 0.75
        }

        return width
    }

    function getHeight() {
        if (height) {
            return Number(height)
        }

        if (isShortVersion) {
            return window.innerHeight - buttonSize
        }

        return 700
    }

    if (status === 'authorized') {

        return (
            <PluginContext.Provider value={{
                url: url.current as string,
                bot: bot.current as IBot,
                requester: null,
                containerPositionProps: containerPositionProps[position] ?? containerPositionProps['bottom-right'],
                contentPositionProps: contentPositionProps[position] ?? contentPositionProps['bottom-right'],
                borderRadius: isShortVersion ? '0.75rem' : (borderRadius[position] ?? borderRadius['bottom-right']),
                buttonSize,
                isShortVersion,
                showTooltip: !!bot?.current?.tooltip && isTooltipOpen && !isExpanded,
                isExpanded,
                onClose: () => setIsExpanded(false),
                onOpen: () => setIsExpanded(true),
                onToggle: () => setIsExpanded(!isExpanded),
                onTooltipClose,
                height: getHeight(),
                width: getWidth()
            }}
            >
                {children}
            </PluginContext.Provider>

        );
    }

    if (status === 'loading') {

        return (
            <Plugin.Container
                props={{
                    ...(containerPositionProps[position] ?? containerPositionProps['bottom-right'])
                }}
            >
                <SkeletonCircle w='3rem' h='3rem' boxShadow='lg' />
            </Plugin.Container>
        )
    }

    if (status === 'error' && displayError) {
        return (
            <Error
                dataSet={dataSet}
                error={error.current}
                onReload={() => authorize(token)}
                buttonSize={buttonSize}
                props={{
                    ...(containerPositionProps[position] ?? containerPositionProps['bottom-right'])
                }}
            />
        );
    }

    return (<></>)
}