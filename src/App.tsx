import { Plugin } from './components/plugin';
import { usePlugin } from './services/plugin/hook';
import { Lia } from './components/Lia';
import { PluginMode } from './services/plugin/types';
import { Box } from '@chakra-ui/react';

interface Props {
  allowDarkTheme?: boolean;
  border?: string;
  zIndex?: number;
  tooltipColor?: string;
  username?: string | null;
  name?: string | null;
  className?: string;
  btn: {
    type?: 'circle' | 'badge';
    color?: string;
    icon?: string;
    title?: string;
    tooltip?: string | null;
    tooltipColor?: string | null;
    tooltipBg?: string | null;
    img?: {
      height: string;
      width: string;
    }
  }
}

function App({
  allowDarkTheme = false,
  border,
  zIndex = 9998,
  username = null,
  name = null,
  className,
  btn
}: Props) {

  const { bot, url, buttonSize, mode, component, notification } = usePlugin();


  if (mode === PluginMode.POPOVER) {
    return (
      <>
        <Plugin.Container
          props={{
            zIndex
          }}
        >
          <Plugin.Popover.Container
            buttonSize={buttonSize}
          >
            <Plugin.Popover.Content
              border={border}
              color={btn.color}
            >
              <Lia
                allowDarkTheme={allowDarkTheme}
                bot={bot}
                src={url}
                username={username}
                name={name}
              />
            </Plugin.Popover.Content>
            <Plugin.Popover.Button
              size={buttonSize}
              {...btn}
            />
          </Plugin.Popover.Container>

        </Plugin.Container>
        {!!notification && (
          <iframe
            style={{
              display: 'none'
            }}
            title='conversu-notification'
            id='conversu-notification'
            src={`${notification}?origin=${btoa(window.location.href)}`}
          />
        )}
      </>
    );
  }


  return (
    <Box
      width={component?.width ?? '100%'}
      height={component?.height ?? '100%'}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      className={className}
    >
      <Lia
        allowDarkTheme={allowDarkTheme}
        bot={bot}
        src={url}
        username={username}
        name={name}
      />
    </Box >
  );
}

export default App;
