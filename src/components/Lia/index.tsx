import { useEffect, useState } from 'react';
import { IBot } from '../../@types/bot';
import { usePlugin } from '../../services/plugin/hook';
import { useTheme } from '../../theme/theme.hook';
import { useSessionContext } from '../../services/session/hook';
import { Button, Icon, Spinner } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

interface Props {
	allowDarkTheme: boolean;
	bot: IBot;
	src: string;
	username?: string | null;
	name?: string | null;
}



export function Lia({ allowDarkTheme, bot, src, username, name }: Props) {


	const { borderRadius, isMaximized, mode } = usePlugin();
	const { isDarkTheme } = useTheme();
	const { handleMessageEvents, session } = useSessionContext();

	const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'error'>('loading');



	const params = {
		type: 'plugin',
		theme: isDarkTheme && allowDarkTheme ? 'dark' : 'light',
		'allow-toggle': allowDarkTheme,
		origin: btoa(window.location.origin),
		username: !!username ? btoa(username) : null,
		name: !!name ? btoa(name) : null,
		mode,
		isExpanded: isMaximized
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


	useEffect(() => { }, [isMaximized])

	useEffect(() => {
		if (iframeStatus !== 'loading') return;

		const timeout = setTimeout(() => {
			setIframeStatus(prev =>
				prev === 'loading' ? 'error' : prev
			);
		}, 8000);

		return () => clearTimeout(timeout);
	}, [iframeStatus]);
	// mocked to got error
	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		setIframeStatus('error');
	// 	}, 4000); // 6–10s é o padrão de mercado

	// 	return () => clearTimeout(timeout);
	// }, [])



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


	const queryParams = `${Object.entries(params).map((e) => e.join('=')).join('&')}`;
	const url = session ? `${src}/${bot.alias}/i/${session}?${queryParams}` : `${src}/${bot.alias}?${queryParams}`;
	const newTabUrl = `${src}/${bot.alias}?${Object.entries(params).filter(e => e[0] !== 'type').map((e) => e.join('=')).join('&')}`


	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'relative',
				borderRadius: borderRadius as string,
				overflow: 'hidden'
			}}
		>
			{/* Loading */}
			{iframeStatus === 'loading' && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: isDarkTheme ? '#0f0f0f' : '#fafafa',
						zIndex: 2,
						flexDirection: 'column',
						gap: '1rem'
					}}
				>
					<Spinner size="lg" />
					<span>Carregando...</span>
				</div>
			)}

			{/* Fallback */}
			{iframeStatus === 'error' && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: isDarkTheme ? '#0f0f0f' : '#fafafa',
						zIndex: 2,
						flexDirection: 'column',
						padding: 32,
						gap: '2rem'
					}}
				>
					<h3 style={{ textAlign: 'center', width: '100%' }}>Conteúdo indisponível</h3>
					<p style={{ textAlign: 'center', width: '100%' }}>
						Não foi possível carregar este conteúdo no momento.
						<br />
						Isso pode ocorrer por restrições de rede, segurança ou indisponibilidade temporária.
					</p>

					<Button
						onClick={() => window.open(newTabUrl, '_blank')}
						w="100%"
						maxW="200px"
						bg={bot?.layout?.colors?.primary}
						color="white"
						leftIcon={<Icon as={FiExternalLink} />}
					>
						acessar
					</Button>
				</div>
			)}

			{/* IFRAME — SEMPRE MONTADO */}
			{iframeStatus !== 'error' && (
				<iframe
					id={bot.uuid}
					src={new URL(url).toString()}
					title="conversu-plugin"
					width="100%"
					height="100%"
					onLoad={() => {
						setIframeStatus('loaded');
					}}
					onError={() => {
						setIframeStatus('error');
					}}
					style={{
						border: 'none',
						borderRadius: borderRadius as string,
						opacity: iframeStatus === 'loaded' ? 1 : 0,
						pointerEvents: iframeStatus === 'loaded' ? 'auto' : 'none',
						transition: 'opacity 0.2s ease'
					}}
				/>
			)}
		</div>
	);
}
