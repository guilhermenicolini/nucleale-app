import 'styled-components'

declare module 'styled-components' {
  export interface ThemeTypography {
    'font-size': string
    'font-weight': string
    'line-height': string
  }

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
    typography: {
      headline1: ThemeTypography
      headline2: ThemeTypography
      headline3: ThemeTypography
      headline4: ThemeTypography
      headline5: ThemeTypography
      headline6: ThemeTypography
      subtitle1: ThemeTypography
      subtitle2: ThemeTypography
      body1: ThemeTypography
      body2: ThemeTypography
      button: ThemeTypography
      caption: ThemeTypography
      overline: ThemeTypography
    }
  }
}
