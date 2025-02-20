/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react"
import { BoxProps, FlexProps, SkeletonCircle, useDisclosure } from "@chakra-ui/react";

import { PluginContext } from "./context";

import { Plugin } from "../../components/plugin";
import { IBot } from "../../@types/bot";
import { Error } from "../../components/Error";
import { PluginPosition } from "../../@types/plugin";
import { useAuthorize } from "../../hooks/useAuthorize";


interface Props {
    token?: string
    children: ReactNode;
    displayError?: boolean;
    dataSet: any;
    position?: PluginPosition;
    buttonSize?: number;
    height?: string;
    width?: string;
    startHour?: string | null;
    endHour?: string | null;
}


export function PluginProvider({
    token,
    children,
    displayError = false,
    dataSet,
    position = 'bottom-right',
    buttonSize = 64,
    height,
    startHour = null,
    endHour = null
}: Props) {


    const [isExpanded, setIsExpanded] = useState(false);

    const { isOpen: isTooltipOpen, onClose: onTooltipClose, onOpen: onTooltipOpen } = useDisclosure();

    const { bot, error, status, url, refetch } = useAuthorize({
        dataSet,
        token,
        defaultStartHour: startHour,
        defaultEndHour: endHour,
        onTooltipOpen
    });

    useEffect(() => {
        refetch();
    }, []);


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

            width = window.innerWidth
        }

        if (!!bot?.tooltip && isTooltipOpen && !isExpanded) {

            return width * 0.75
        }

        return width
    }

    function getHeight() {
        if (height) {
            return Number(height)
        }

        if (isShortVersion) {
            return window.innerHeight// - buttonSize
        }

        return 700
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
                height: getHeight(),
                width: getWidth()
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