/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react"
import { BoxProps, FlexProps, SkeletonCircle, useDisclosure } from "@chakra-ui/react";

import { PluginContext } from "./context";

import { Plugin } from "../../components/plugin";
import { IBot } from "../../@types/bot";
import { Error } from "../../components/Error";
import { PluginPosition } from "../../@types/plugin";
import { useAuthorize } from "../../hooks/useAuthorize";
import { PluginMode } from "./types";
import { useRemoteSoundNotification } from "../../hooks/useNotificationSound";


interface Props {
    token?: string
    children: ReactNode;
    displayError?: boolean;
    dataSet: any;
    position?: PluginPosition;
    buttonSize?: number;
    height?: string;
    width?: string;
    maxHeight?: string;
    maxWidth?: string;
    startHour?: string | null;
    endHour?: string | null;
    mode?: PluginMode;
    allowExpand?: boolean;
    btnType?: 'circle' | 'badge' | 'ghost';
    tooltip?: string | null;
}


export function PluginProvider({
    token,
    children,
    displayError = false,
    dataSet,
    position = 'bottom-right',
    buttonSize = 64,
    height,
    width,
    maxHeight,
    maxWidth,
    startHour = null,
    endHour = null,
    mode = PluginMode.POPOVER,
    allowExpand = true,
    btnType = 'circle',
    tooltip = null
}: Props) {


    const [isExpanded, setIsExpanded] = useState(false);

    const { isOpen: isTooltipOpen, onClose, onOpen: onTooltipOpen } = useDisclosure();
    const { isOpen: isMaximized, onToggle: onMaximizeToggle, onClose: onMinimize } = useDisclosure();

    const { playSound, prefetch } = useRemoteSoundNotification();

    const [notifyTooltip, setNotifyTooltip] = useState<string | null>(null);

    const { bot, error, status, url, refetch, notification } = useAuthorize({
        dataSet,
        token,
        defaultStartHour: startHour,
        defaultEndHour: endHour,
        onTooltipOpen
    });

    useEffect(() => {
        refetch();
        prefetch();
        onMinimize();
    }, []);


    const isShortVersion = window.innerWidth <= 400;

    const isGhost = btnType === 'ghost'
    const yAxisPosition = ['badge', 'ghost'].includes(btnType) ? '0' : '2';
    const xAxisPosition = isShortVersion ? (isExpanded ? (isMaximized ? '1' : '0') : isGhost ? '0' : '1') : isGhost ? '0' : '2';

    function tooltipMessage(v: string) {
        setNotifyTooltip(v);
        onTooltipOpen()
    }

    function onTooltipClose() {
        onClose();
        setNotifyTooltip(null);
    }

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

    const listener = (event: MessageEvent) => {
        if (!notification || !notification.startsWith(event.origin)) return;

        const data = JSON.parse(event.data);

        if (data.event === 'NOTIFY') {
            playSound();
            tooltipMessage(data.title)
        }
    }

    useEffect(() => {

        window.addEventListener('message', listener);

        return () => {
            window.removeEventListener('message', listener);
        };
    }, [notification]);


    function getWidth() {

        if (!isExpanded && !bot?.tooltip) {
            return buttonSize;
        }

        let width = 450
        if (width) {
            width = Number(width)
        }

        if (isShortVersion) {

            return window.innerWidth
        }

        if (!!bot?.tooltip && isTooltipOpen && !isExpanded) {

            return width * 0.75
        }


        if (isMaximized) {
            return window.innerWidth
        }

        return width
    }

    function getHeight() {

        const minimizeButtonSize = 24;
        const padding = minimizeButtonSize + 16

        if (height) {

            if (window.innerHeight >= Number(height)) {

                return Number(height)
            }

            return window.innerHeight - padding
        }

        if (isShortVersion) {

            if (window.innerHeight >= Number(height)) {

                return Number(height)
            }

            return window.innerHeight - padding
        }


        if (isMaximized) {
            return window.innerHeight - padding
        }

        if (window.innerHeight >= 720 + padding) {

            return 720;
        }

        return window.innerHeight - padding
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

    if (status === 'disabled') {

        return (<></>)
    }

    if (status === 'authorized') {

        return (
            <PluginContext.Provider value={{
                url: url as string,
                bot: bot as IBot,
                requester: null,
                notification: notification || null,
                containerPositionProps: containerPositionProps[position] ?? containerPositionProps['bottom-right'],
                contentPositionProps: contentPositionProps[position] ?? contentPositionProps['bottom-right'],
                borderRadius: isShortVersion ? '0.75rem' : (borderRadius[position] ?? borderRadius['bottom-right']),
                buttonSize,
                isShortVersion,
                showTooltip: !!(notifyTooltip || bot?.tooltip || tooltip) && isTooltipOpen && !isExpanded,
                tooltip: notifyTooltip || bot?.tooltip || tooltip || '',
                isExpanded,
                onClose: () => setIsExpanded(false),
                onOpen: () => setIsExpanded(true),
                onToggle: () => setIsExpanded(!isExpanded),
                onTooltipClose,
                popover: {
                    height: getHeight(),
                    width: getWidth(),
                },
                component: {
                    height,
                    width,
                    maxHeight,
                    maxWidth
                },
                mode,
                isMaximized: isMaximized && allowExpand,
                onMaximizeToggle,
                allowExpand,
                tooltipMessage
            }}
            >
                {children}
            </PluginContext.Provider>

        );
    }


    if (status === 'error' && displayError) {
        return (
            <Error
                dataSet={dataSet}
                error={error}
                onReload={refetch}
                buttonSize={buttonSize}
                props={{
                    ...(containerPositionProps[position] ?? containerPositionProps['bottom-right'])
                }}
            />
        );
    }

    return (<></>)
}