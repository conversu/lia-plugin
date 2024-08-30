import { createContext } from "react";
import { IBot } from "../../@types/bot";


export interface IPluginContext {
    bot: IBot;
    url: string;
    requester?: string | null;
}


export const PluginContext = createContext<IPluginContext>({} as IPluginContext);