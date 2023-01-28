import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme /// passando as informações de deafult theme para variavel themeType

// extende a DefaultTheme com as info de ThemeType
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
