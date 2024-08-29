import { useContext } from "react";
import { MessageContext } from "./message.context";


export const useMessageContext = () => useContext(MessageContext);