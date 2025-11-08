import { createContext } from "react";
import { IBot } from "../../@types/bot";
import { BoxProps, FlexProps } from "@chakra-ui/react";


export interface IPluginContext {
    bot: IBot;
    url: string;
    notification: string | null;
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
    popover: {
        height: number;
        width: number;
    },
    component: {
        height?: string | number;
        width?: string | number;
        maxWidth?: string | number;
        maxHeight?: string | number;
    }
    mode: 'POPOVER' | 'COMPONENT';
    isMaximized: boolean;
    onMaximizeToggle: () => void;
    allowExpand: boolean;
    tooltipMessage: (v: string) => void;
    tooltip: string;
}


export const PluginContext = createContext<IPluginContext>({} as IPluginContext);