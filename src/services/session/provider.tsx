import { ReactNode, useEffect, useRef, useState } from "react";
import { SessionContext } from "./context";
import { usePlugin } from "../plugin/hook";


interface Props {
    children: ReactNode;
}

export enum MessageEventType {
    SIGN_IN = 'SIGN_IN',
    LOGOUT = 'LOGOUT',
    OPENED = 'OPENED',
    CLOSED = 'CLOSED',
    POPOVER_CLOSE = 'POPOVER_CLOSE'
}


export function SessionProvider({ children }: Props) {

    const CONVERSU_SESSION = 'conversu-session';

    const [session, setSession] = useState<string | null>(localStorage.getItem(CONVERSU_SESSION) ?? null);

    const { onClose } = usePlugin();

    // Ao encerrar uma sessão só remover ela do localStorage (Verificar se precisa remover do use state sessionId)
    const handleClosedSession = () => {
        localStorage.removeItem(CONVERSU_SESSION);
    };

    // Se tiver uma sessão no localStorage ele abre ela, senão abre a nova sessão
    const handleOpenedSession = (
        sessionId: string
    ) => {
        const storageSessionId = localStorage.getItem(CONVERSU_SESSION);

        if (storageSessionId) {
            setSession(storageSessionId);
            return;
        }

        localStorage.setItem(CONVERSU_SESSION, sessionId);
        setSession(sessionId);
    };

    const handleLogout = () => {
        localStorage.removeItem(CONVERSU_SESSION);
        setSession(null);
    }

    const handleMessageEvents = (event: MessageEvent, src: string) => {
        if (event.origin !== src) return;

        const data = JSON.parse(event.data);

        const eventType: MessageEventType = data.event;

        switch (eventType) {
            case MessageEventType.OPENED:
                handleOpenedSession(data.sessionId);
                break;
            case MessageEventType.CLOSED:
                handleClosedSession();
                break;
            case MessageEventType.LOGOUT:
                handleLogout();
                break;
            case MessageEventType.POPOVER_CLOSE:
                onClose();
                break;
            default:
                break;
        }
    };


    return (
        <SessionContext.Provider value={{
            session,
            handleOpenedSession,
            handleClosedSession,
            handleLogout,
            handleMessageEvents
        }}>
            {children}
        </SessionContext.Provider>
    )
}