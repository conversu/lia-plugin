import { useContext } from "react";
import ParentProvider from "./provider";
import { ParentContext } from './context';

export const Parent = {
    Provider: ParentProvider,
    useContext: () => useContext(ParentContext)
}