import { useContext } from "react";
import { ChatFormContext } from "./context.form";


export const useChatForm = () => useContext(ChatFormContext);