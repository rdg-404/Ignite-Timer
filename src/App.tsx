
import {ThemeProvider} from 'styled-components'
import { Button } from "./components/Button";
import { defaultTheme } from './styles/themes/default';

export function App() {


  //envia variant como props
  return (
   <ThemeProvider theme={defaultTheme}>
      <Button variant="primary"/>
      <Button variant="secondary"/>
      <Button variant="success"/>
      <Button variant="danger"/>
      <Button/>
   </ThemeProvider>
  )
}


