import { useEffect } from 'react';
import { IBot } from '../../@types/bot';
import { usePlugin } from '../../services/plugin/hook';
import { useTheme } from '../../theme/theme.hook';
import { useSessionContext } from '../../services/session/hook';

interface Props {
	allowDarkTheme: boolean;
	bot: IBot;
	src: string;
	user?: string;
}

export function Lia({ allowDarkTheme, bot, src, user }: Props) {


	const { borderRadius } = usePlugin();
	const { isDarkTheme } = useTheme();
	const { handleMessageEvents, session } = useSessionContext();

	const params = {
		type: 'plugin',
		theme: isDarkTheme && allowDarkTheme ? 'dark' : 'light',
		'allow-toggle': allowDarkTheme,
		origin: btoa(window.location.origin),
		username: btoa(user ?? 'unknown'),
	};

	const listener = (e: MessageEvent) => {
		return handleMessageEvents(e, src);
	};

	useEffect(() => {

		window.addEventListener('message', listener);

		return () => {
			window.removeEventListener('message', listener);
		};
	}, [bot.alias, src]);

	useEffect(() => {
		const iframe = document.getElementById(bot.uuid);

		const disableScroll = (event: any) => {
			event.preventDefault();
			event.stopPropagation();
		};

		if (iframe) {
			iframe.addEventListener('mouseenter', () => {
				document.addEventListener('wheel', disableScroll, { passive: false });
				document.addEventListener('touchmove', disableScroll, { passive: false });
			});

			iframe.addEventListener('mouseleave', () => {
				document.removeEventListener('wheel', disableScroll);
				document.removeEventListener('touchmove', disableScroll);
			});
		}

		return () => {
			document.removeEventListener('wheel', disableScroll);
			document.removeEventListener('touchmove', disableScroll);
		};
	}, [bot.uuid]);


	const queryParams = `${Object.entries(params).map((e) => e.join('=')).join('&')}`

	return (
		<>{
			session ? (
				<iframe
					src={new URL(`${src}/${bot.alias}/i/${session}?${queryParams}`).toString()}
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
			) : (
				<iframe
					src={new URL(`${src}/${bot.alias}?${queryParams}`).toString()}
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
			)
		}</>
	);
}
