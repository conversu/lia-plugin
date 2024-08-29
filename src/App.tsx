import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './theme/theme.provider';
import { Plugin } from './components/plugin';


interface Props {
  token: string;
}

function App(props: Props) {


  return (
    <ThemeProvider>
      <Plugin.Container>
        <Plugin.Popover.Container>
          <Plugin.Popover.Content>
            {/* <Plugin.Popover.Header
              title='title'
              subtitle='subtitle'
            />
            <Plugin.Popover.Body>
              body
            </Plugin.Popover.Body>
            <Plugin.Popover.Footer>
              <Input w='100%' />
            </Plugin.Popover.Footer> */}
            <iframe
              src="https://stage.chat.conversuai.com.br/conversu"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </Plugin.Popover.Content>
          <Plugin.Popover.Button />
        </Plugin.Popover.Container>
      </Plugin.Container>
    </ThemeProvider>
  );
}

export default App;
