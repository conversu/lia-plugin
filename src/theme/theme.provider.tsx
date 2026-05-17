import { ReactNode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

import {
    themeLight
} from "./theme.global";
import { ThemeContext } from "./theme.context";
import { defaultLayout } from "../@cte/layout";
import { usePlugin } from "../services/plugin/hook";



interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: 'dark' | 'light';
    globalCss?: 'allowed' | 'blocked';
    resetCss?: 'true' | 'false';
}



export function ThemeProvider({
    children,
    defaultTheme = 'light',
    globalCss = 'allowed',
    resetCss = 'false'
}: ThemeProviderProps) {

    const { bot } = usePlugin();

    const isDarkTheme = defaultTheme === 'dark';

    const themeProps = isDarkTheme ? themeLight : themeLight;

    const chakraTheme = extendTheme({
        initialColorMode: isDarkTheme ? 'dark' : 'light',
        useSystemColorMode: false,
        ...themeProps
    });

    return (
        <ChakraProvider
            theme={chakraTheme as Record<string, unknown>}
            disableGlobalStyle={globalCss === 'blocked'}
            resetCSS={resetCss === 'true'}
        >
            <Global styles={`
                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"],
                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"]:hover,
                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"]:focus,
                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"]:focus-visible,
                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"]:active {
                    all: unset !important;
                    box-sizing: border-box !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    width: auto !important;
                    height: auto !important;
                    min-width: unset !important;
                    min-height: unset !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    background: transparent !important;
                    background-color: transparent !important;
                    border: none !important;
                    border-width: 0 !important;
                    border-style: none !important;
                    border-color: transparent !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    outline: none !important;
                    color: inherit !important;
                    font: inherit !important;
                    cursor: pointer !important;
                    appearance: none !important;
                    -webkit-appearance: none !important;
                    transform: none !important;
                }

                #conversu-plugin button#cp-open-btn[data-btn-type="ghost"] img {
                    display: block !important;
                    width: auto !important;
                    height: auto !important;
                    max-width: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                    pointer-events: none !important;
                    user-select: none !important;
                }
            `} />
            <ThemeContext.Provider value={{
                bg: 'transparent',
                color: 'white',
                isDarkTheme,
                theme: chakraTheme,
                layout: bot?.layout ?? defaultLayout
            }}>
                {children}
            </ThemeContext.Provider>
        </ChakraProvider>
    );
}