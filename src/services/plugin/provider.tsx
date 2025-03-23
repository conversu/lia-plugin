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
    btnType?: 'circle' | 'badge';
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
    btnType = 'circle'
}: Props) {


    const [isExpanded, setIsExpanded] = useState(false);

    const { isOpen: isTooltipOpen, onClose: onTooltipClose, onOpen: onTooltipOpen } = useDisclosure();
    const { isOpen: isMaximized, onToggle: onMaximizeToggle, onClose: onMinimize } = useDisclosure();

    const { bot, error, status, url, refetch } = useAuthorize({
        dataSet,
        token,
        defaultStartHour: startHour,
        defaultEndHour: endHour,
        onTooltipOpen
    });

    useEffect(() => {
        refetch();
        onMinimize();
    }, []);


    const isShortVersion = window.innerWidth <= 400;

    const yAxisPosition = btnType === 'badge' ? '0' : '2';
    const xAxisPosition = isShortVersion ? isExpanded ? isMaximized ? '1' : '0' : '1' : '2';


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

        if (height) {

            if (window.innerHeight >= Number(height)) {

                return Number(height)
            }

            return window.innerHeight 
        }

        if (isShortVersion) {

            if (window.innerHeight >= Number(height)) {

                return Number(height)
            }

            return window.innerHeight - 64
        }


        if (isMaximized) {
            return window.innerHeight * 0.80 - 24
        }

        if (window.innerHeight >= 720) {

            return 720;
        }
 
        return window.innerHeight - 24
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
                containerPositionProps: containerPositionProps[position] ?? containerPositionProps['bottom-right'],
                contentPositionProps: contentPositionProps[position] ?? contentPositionProps['bottom-right'],
                borderRadius: isShortVersion ? '0.75rem' : (borderRadius[position] ?? borderRadius['bottom-right']),
                buttonSize,
                isShortVersion,
                showTooltip: !!bot?.tooltip && isTooltipOpen && !isExpanded,
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
                allowExpand
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