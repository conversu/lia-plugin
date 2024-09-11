import { createContext } from "react";
import { IBot } from "../../@types/bot";
import { BoxProps, FlexProps } from "@chakra-ui/react";


export interface IPluginContext {
    bot: IBot;
    url: string;
    requester?: string | null;
    contentPositionProps: Partial<FlexProps>;
    containerPositionProps: Partial<BoxProps>;
    borderRadius: FlexProps['borderRadius'];
    buttonSize: number;
    isShortVersion: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onClose: () => void;
    onOpen: () => void;
    showTooltip: boolean;
    onTooltipClose: () => void;
    height: number;
    width: number;
}


export const PluginContext = createContext<IPluginContext>({} as IPluginContext);