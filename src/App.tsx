import { Input } from "@chakra-ui/react"
import { Plugin } from "./components/plugin"
import { useParams } from "react-router-dom"

function App() {

  const { token } = useParams();

  console.log(token);


  return (
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
  )
}

export default App
