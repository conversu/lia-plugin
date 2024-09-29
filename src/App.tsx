import { Plugin } from './components/plugin';
import { usePlugin } from './services/plugin/hook';
import { Lia } from './components/Lia';


interface Props {
  allowDarkTheme?: boolean;
  color?: string;
  border?: string;
  zIndex?: number;
  tooltipColor?: string;
  user?: string;
}

function App({
  allowDarkTheme = false,
  color,
  border,
  tooltipColor,
  zIndex = 9998,
  user
}: Props) {

  const { bot, url, buttonSize } = usePlugin();

  return (
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
        >
          <Lia
            allowDarkTheme={allowDarkTheme}
            bot={bot}
            src={url}
            user={user}
          />
        </Plugin.Popover.Content>
        <Plugin.Popover.Button
          color={color}
          size={buttonSize}
          tooltip={tooltipColor}
        />
      </Plugin.Popover.Container>
    </Plugin.Container>
  );
}

export default App;
