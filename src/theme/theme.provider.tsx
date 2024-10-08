import { ReactNode, useEffect, useRef, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import {
    themeLight, inputGlobalProps, scrollbarStyle
} from "./theme.global";
import { ThemeContext } from "./theme.context";
import { defaultLayout } from "../@cte/layout";
import { usePlugin } from "../services/plugin/hook";



interface ThemeProviderProps {
    children: ReactNode;
    allowDarkTheme?: boolean;
}



export function ThemeProvider({
    children,
    allowDarkTheme = false
}: ThemeProviderProps) {

    const { bot } = usePlugin();

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = useRef<'dark' | 'light'>('light');

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

    const chakraTheme = extendTheme({
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
        <ChakraProvider theme={chakraTheme as Record<string, unknown>} resetCSS>
            <ThemeContext.Provider value={{
                bg: 'transparent',
                color: 'white',
                inputProps: { ...inputGlobalProps.base, ...inputGlobalProps[theme.current] },
                isDarkTheme,
                scrollbarStyle: { ...scrollbarStyle.base, ...scrollbarStyle[theme.current] },
                theme: chakraTheme,
                toggleTheme,
                layout: bot?.layout ?? defaultLayout
            }}>
                {children}
            </ThemeContext.Provider>
        </ChakraProvider>
    );
}