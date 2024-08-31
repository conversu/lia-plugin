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
}


export const PluginContext = createContext<IPluginContext>({} as IPluginContext);