import 'styled-components'

interface IPallete {
  main: string
  contrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      common: {
        black: string
        white: string
      }
      primary: IPallete
      secondary: IPallete
    }
  }
}
