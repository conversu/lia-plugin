import { InputProps } from "@chakra-ui/react";
import { createContext } from "react";

type ThemeContextData = {
    theme: unknown;
    bg: string;
    color: string;
    isDarkTheme: boolean;
    toggleTheme: () => void;
    inputProps: InputProps;
    sidebarStyle: {
        colorScheme: string;
        bg: string;
        color: string;
        hoverColor: string;
    }
    scrollbarStyle: {
        borderRadius: string;
        short: {
            track: string;
            thumb: string;
            thumbHover: string;
            width: string;
        },
        large: {
            track: string;
            thumb: string;
            thumbHover: string;
            width: string;
        }
    }
}

export const ThemeContext = createContext({} as ThemeContextData);
