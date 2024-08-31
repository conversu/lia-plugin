import { ThemeProvider } from './theme/theme.provider';
import { Plugin } from './components/plugin';
import { usePlugin } from './services/plugin/hook';
import { Lia } from './components/Lia';


interface Props {
  allowDarkTheme?: boolean;
  height?: string;
  width?: string;
  color?: string;
  border?: string;
}

function App({
  height = '700',
  width = '450',
  allowDarkTheme = false,
  color,
  border
}: Props) {

  const { bot, url } = usePlugin();

  return (
    <ThemeProvider
      allowDarkTheme={allowDarkTheme}
      layout={bot.layout}
    >
      <Plugin.Container>
        <Plugin.Popover.Container
          height={Number(height)}
          width={Number(width)}
        >
          <Plugin.Popover.Content
            border={border}
          >
            <Lia
              allowDarkTheme={allowDarkTheme}
              bot={bot}
              src={url}
            />
          </Plugin.Popover.Content>
          <Plugin.Popover.Button
            color={color}
          />
        </Plugin.Popover.Container>
      </Plugin.Container>
    </ThemeProvider>
  );
}

export default App;
