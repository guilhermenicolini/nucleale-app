import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    general: {
      fontFamily: string
      fontSize: string
    }
    colors: {
      palette: {
        primary: string
        secondary: string
        danger: string
        warning: string
        success: string
        info: string
        placeHolder: string
      }
      light: {
        highEmphasis: string
        mediumEmphasis: string
        disabled: string
      }
      dark: {
        highEmphasis: string
        mediumEmphasis: string
        disabled: string
      }
    }
  }
}
