import { InputProps } from "@chakra-ui/react";
import { createContext } from "react";
import { IChatLayoutProps } from "../@types/bot";

type ThemeContextData = {
    theme: unknown;
    bg: string;
    color: string;
    isDarkTheme: boolean;
    toggleTheme: () => void;
    inputProps: InputProps;
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
    },
    layout: IChatLayoutProps;
}

export const ThemeContext = createContext({} as ThemeContextData);
