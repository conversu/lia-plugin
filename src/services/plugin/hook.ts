import { useContext } from "react";
import { PluginContext } from "./context";


export const usePlugin = () => useContext(PluginContext);