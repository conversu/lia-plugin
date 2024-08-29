import React, { ReactNode } from 'react';
import { Center, CenterProps, Flex, Spinner, Text } from "@chakra-ui/react";


import { RenderIf } from "./RenderIf";

import { useTheme } from '@theme/theme.hook';



type LoadableType = 'default';


export interface LoadableProps {
    isLoading: boolean;
    title?: string;
    children?: ReactNode | ReactNode[];
    isLoadingError?: boolean;
    loadingErrorMessage?: ReactNode;
    errorElement?: ReactNode;
    skeleton?: ReactNode;
    asset?: LoadableType;
    color?: string;
    containerProps?: CenterProps;
}

export function Loadable({
    isLoading,
    isLoadingError = false,
    errorElement,
    loadingErrorMessage,
    skeleton,
    title,
    asset = 'default',
    children,
    containerProps
}: LoadableProps) {

    const { isDarkTheme } = useTheme();

    const defaultColor = isDarkTheme ? 'white' : 'app.primary';


    if (!isLoading && !isLoadingError) {

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }


    if (isLoading) {

        return (
            <Center w='100%' h='100%' {...containerProps}>
                <RenderIf condition={!skeleton}>
                    <Flex w='100%' flexDir='column' align='center' justify='center' gap='1rem'>
                        <Spinner color={defaultColor} />
                        <Text as='span' w='100%' textAlign='center'>{title}</Text>
                    </Flex>
                </RenderIf>
                <RenderIf condition={!!skeleton}>
                    {skeleton}
                </RenderIf>
            </Center>
        )
    }

    if (isLoadingError) {

        return (
            <Center w='100%' h='100%' {...containerProps}>
                <RenderIf condition={!!errorElement}>
                    {errorElement}
                </RenderIf>
                <RenderIf condition={!errorElement}>
                    <Flex w='100%' flexDir='column' align='center' justify='center' gap='1rem'>
                        <Spinner color={defaultColor} />
                        <Text as='span' w='100%' textAlign='center'>{title}</Text>
                    </Flex>
                </RenderIf>
            </Center>
        );
    }


    return (<></>);
}