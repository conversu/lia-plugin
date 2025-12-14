import { ReactNode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
    resetCss = 'true'
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