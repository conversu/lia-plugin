import { createContext } from "react";
import { IChatLayoutProps } from "../@types/bot";

type ThemeContextData = {
    theme: unknown;
    bg: string;
    color: string;
    isDarkTheme: boolean;
    layout: IChatLayoutProps;
}

export const ThemeContext = createContext({} as ThemeContextData);
