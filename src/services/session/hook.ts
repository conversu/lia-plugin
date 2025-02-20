import { useContext } from "react";
import { SessionContext } from "./context";



export const useSessionContext = () => useContext(SessionContext)