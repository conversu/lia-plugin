import { ThemeProvider } from './theme/theme.provider';
import { Plugin } from './components/plugin';
import { usePlugin } from '@services/plugin/hook';
import { Lia } from '@components/Lia';


interface Props {
  allowDarkTheme?: boolean;
}

function App({
  allowDarkTheme = false
}: Props) {

  const { bot, url } = usePlugin();

  return (
    <ThemeProvider
      allowDarkTheme={allowDarkTheme}
      layout={bot.layout}
    >
      <Plugin.Container>
        <Plugin.Popover.Container>
          <Plugin.Popover.Content>
            <Lia
              allowDarkTheme={allowDarkTheme}
              bot={bot}
              src={url}
            />
          </Plugin.Popover.Content>
          <Plugin.Popover.Button />
        </Plugin.Popover.Container>
      </Plugin.Container>
    </ThemeProvider>
  );
}

export default App;
