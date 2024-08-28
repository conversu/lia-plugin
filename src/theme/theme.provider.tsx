import { ReactNode, useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import {
    global,
    themeLight,
    grayScale,
    conversuColors,
    inputGlobalProps,
    sidebarStyle,
    scrollbarStyle
} from "./theme.global";
import { ThemeContext } from "@emotion/react";


interface ThemeProviderProps {
    children: ReactNode;
}



export function ThemeProvider({ children }: ThemeProviderProps) {

    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('chakra-ui-color-mode') === 'dark');

    const themeProps = isDarkTheme ? themeLight : themeLight;
    const bg = isDarkTheme ? grayScale[900] : grayScale[50];
    const color = isDarkTheme ? '#FFFFFF' : conversuColors.purple;

    function setVw() {
        const vw = document.documentElement.clientWidth / 100;
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    }

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    useEffect(() => {
        setVw();
        window.addEventListener('resize', setVw);
        const userTheme = localStorage.getItem('user-theme');
        if (userTheme) {
            setIsDarkTheme(userTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkTheme(prefersDark);
        }
    }, []);

    const theme = extendTheme({
        initialColorMode: isDarkTheme ? 'dark' : 'light',
        useSystemColorMode: false,
        styles: {
            global: {
                body: {
                    ...global,
                    bg: bg,
                    color: color,
                },
                html: {
                    ...global,
                    bg: bg,
                    color: color,
                }
            },
        },
        ...themeProps
    });

    function toggleTheme() {
        const isDark = !isDarkTheme;
        localStorage.setItem('user-theme', isDark ? 'dark' : 'light');
        setIsDarkTheme(isDark);
    }


    return (
        <ThemeContext.Provider value={{
            theme,
            bg,
            color,
            isDarkTheme,
            inputProps: isDarkTheme ? { ...inputGlobalProps.base, ...inputGlobalProps.dark } : { ...inputGlobalProps.base, ...inputGlobalProps.light },
            sidebarStyle: sidebarStyle,
            scrollbarStyle: isDarkTheme ? { ...scrollbarStyle.base, ...scrollbarStyle.dark } : { ...scrollbarStyle.base, ...scrollbarStyle.light },
            toggleTheme
        }}>
            <ChakraProvider theme={theme as Record<string, unknown>} resetCSS>
                {children}
            </ChakraProvider>
        </ThemeContext.Provider>
    );
}