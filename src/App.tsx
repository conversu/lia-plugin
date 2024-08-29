import { Center, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './theme/theme.provider';
import { Plugin } from './components/plugin';


function App(props: any) {


  useEffect(() => {

  }, [])

  const handleNewUserMessage = (message: any) => {
    console.log('new message:', message)
  }

  const [isOpened, setIsOpened] = useState(false);

  return (
    <ThemeProvider>
      <Plugin.Container>
        <Plugin.Popover.Container>
          <Plugin.Popover.Content>
            <Plugin.Popover.Header
              title='title'
              subtitle='subtitle'
            />
            <Plugin.Popover.Body>
              body
            </Plugin.Popover.Body>
            <Plugin.Popover.Footer>
              <Input w='100%' />
            </Plugin.Popover.Footer>
          </Plugin.Popover.Content>
          <Plugin.Popover.Button />
        </Plugin.Popover.Container>
      </Plugin.Container>
    </ThemeProvider>
  );
}

export default App;
