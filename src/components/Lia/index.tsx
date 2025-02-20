import { useEffect, useState } from 'react';
import { IBot } from '../../@types/bot';
import { usePlugin } from '../../services/plugin/hook';
import { useTheme } from '../../theme/theme.hook';
import { MessageEventType } from './message-events.enum';

interface Props {
	allowDarkTheme: boolean;
	bot: IBot;
	src: string;
	user?: string;
}

export function Lia({allowDarkTheme, bot, src, user}: Props) {
	const conversuSession = 'conversu-session';

	const {borderRadius} = usePlugin();
	const {isDarkTheme} = useTheme();

	const params = {
		type: 'plugin',
		theme: isDarkTheme && allowDarkTheme ? 'dark' : 'light',
		'allow-toggle': allowDarkTheme,
		origin: btoa(window.location.origin),
		username: btoa(user ?? 'unknown'),
	};

	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		// Ao encerrar uma sessão só remover ela do localStorage (Verificar se precisa remover do use state sessionId)
		const handleClosedSession = async () => {
			localStorage.removeItem(conversuSession);
		};

		// Se tiver uma sessão no localStorage ele abre ela, senão abre a nova sessão
		const handleOpenedSession = async (
			sessionId: string
		) => {
			const storageSessionId = localStorage.getItem(conversuSession);

			if (storageSessionId) {
				setSessionId(storageSessionId);
				return;
			}

			localStorage.setItem(conversuSession, sessionId);
			setSessionId(sessionId);
		};

		const handleLogout = async () => {
			localStorage.removeItem(conversuSession);
			setSessionId(null);
		}

		const handleMessageEvents = (event: MessageEvent) => {
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
				default:
					break;
			}
		};

		window.addEventListener('message', handleMessageEvents);

		return () => {
			window.removeEventListener('message', handleMessageEvents);
		};
	}, [bot.alias, src, sessionId]);

	useEffect(() => {
		const iframe = document.getElementById(bot.uuid);

		const disableScroll = () => {
			document.body.style.overflow = 'hidden';
		};

		const enableScroll = () => {
			document.body.style.overflow = 'auto';
		};

		iframe?.addEventListener('mouseenter', disableScroll);
		iframe?.addEventListener('mouseleave', enableScroll);

		// Clean up event listeners on component unmount
		return () => {
			iframe?.removeEventListener('mouseenter', disableScroll);
			iframe?.removeEventListener('mouseleave', enableScroll);
		};
	}, [bot.uuid]);

	return (
		<iframe
			src={new URL(
				`${src}/${bot.alias}${
					sessionId ? `/i/${sessionId}` : ''
				}?${Object.entries(params)
					.map((e) => e.join('='))
					.join('&')}`
			).toString()}
			id={bot.uuid}
			title="conversu-plugin"
			width="100%"
			height="100%"
			style={{
				border: 'none',
				borderRadius: borderRadius as string,
				pointerEvents: 'auto',
			}}
		/>
	);
}
