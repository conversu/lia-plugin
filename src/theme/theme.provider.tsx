import { ReactNode, useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import {
    themeLight, inputGlobalProps, scrollbarStyle
} from "./theme.global";

import { Chat } from "@conversu/chat";
import { IChatLayoutProps } from "@conversu/chat/dist/@types/layout";


interface ThemeProviderProps {
    children: ReactNode;
    allowDarkTheme?: boolean;
    layout?: IChatLayoutProps;
}



export function ThemeProvider({
    children,
    allowDarkTheme = false,
    layout
}: ThemeProviderProps) {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const themeProps = isDarkTheme ? themeLight : themeLight;


    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    useEffect(() => {
        if (allowDarkTheme) {
            const userTheme = localStorage.getItem('user-theme');
            if (userTheme) {
                setIsDarkTheme(userTheme === 'dark');
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDarkTheme(prefersDark);
            }
        }
    }, [allowDarkTheme]);

    const theme = extendTheme({
        initialColorMode: isDarkTheme ? 'dark' : 'light',
        useSystemColorMode: false,
        ...themeProps
    });

    function toggleTheme() {
        if (allowDarkTheme) {
            const isDark = !isDarkTheme;
            localStorage.setItem('user-theme', isDark ? 'dark' : 'light');
            setIsDarkTheme(isDark);
        }
    }



    return (
        <ChakraProvider theme={theme as Record<string, unknown>} resetCSS>
            <Chat.Theme.Provider
                inputProps={inputGlobalProps}
                scrollbarStyle={scrollbarStyle}
                isDarkTheme={isDarkTheme}
                layout={layout}
                toggleTheme={toggleTheme}
            >
                {children}
            </Chat.Theme.Provider>
        </ChakraProvider>
    );
}