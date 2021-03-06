import 'styled-components'

declare module 'styled-components' {
  export interface ThemeTypography {
    'font-size': string
    'font-weight': string
    'letter-spacing': string
  }

  export interface Palette {
    color: string
    lighten: number
    darken: number
  }

  export interface Theme {
    general: {
      fontFamily: string
      fontSize: string
      borderRadius: string
      placeHolder: string
      form: string
      boxShadow: string
    }
    colors: {
      palette: {
        primary: Palette
        secondary: Palette
        danger: Palette
        warning: Palette
        success: Palette
        info: Palette
        white: Palette
        black: Palette
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
    zIndex: {
      fab: number
      alert: number
      modal: number
      spinner: number
    }
    breakPoint: {
      mobile: number
      tablet: number
      desktop: number
    }
  }
}
