import { createContext } from "react"


interface ISessionContext {
    session: string | null;
    handleClosedSession: () => void;
    handleOpenedSession: (sessionId: string) => void;
    handleLogout: () => void;
    handleMessageEvents: (event: MessageEvent, src: string) => void;
}


export const SessionContext = createContext({} as ISessionContext)