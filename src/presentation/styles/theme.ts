import { Theme } from 'styled-components'

export type Variants = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'white' | 'black'

export const defaultTheme: Theme = {
  general: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    borderRadius: '5px',
    placeHolder: 'rgba(0, 0, 0, 0.38)',
    form: 'rgb(206, 212, 218)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  colors: {
    palette: {
      primary: {
        color: 'rgb(232, 172, 194)',
        lighten: 10,
        darken: 5
      },
      secondary: {
        color: 'rgb(232, 221, 172)',
        lighten: 10,
        darken: 5
      },
      danger: {
        color: 'rgb(255, 68, 68)',
        lighten: 60,
        darken: 15
      },
      warning: {
        color: 'rgb(255, 187, 51)',
        lighten: 60,
        darken: 15
      },
      success: {
        color: 'rgb(0, 200, 81)',
        lighten: 20,
        darken: 15
      },
      info: {
        color: 'rgb(51, 181, 229)',
        lighten: 20,
        darken: 15
      },
      white: {
        color: 'rgb(255, 255, 255)',
        lighten: 20,
        darken: 15
      },
      black: {
        color: 'rgba(0, 0, 0, .87)',
        lighten: 40,
        darken: -40
      }
    },
    light: {
      highEmphasis: 'rgba(255, 255, 255, 1)',
      mediumEmphasis: 'rgba(255, 255, 255, .74)',
      disabled: 'rgba(255, 255, 255, .34)'
    },
    dark: {
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    headline1: {
      'font-size': '96px',
      'font-weight': '300',
      'letter-spacing': '-1.5px'
    },
    headline2: {
      'font-size': '60px',
      'font-weight': '300',
      'letter-spacing': '-0.5px'
    },
    headline3: {
      'font-size': '48px',
      'font-weight': '400',
      'letter-spacing': '0px'
    },
    headline4: {
      'font-size': '34px',
      'font-weight': '400',
      'letter-spacing': '0.25px'
    },
    headline5: {
      'font-size': '24px',
      'font-weight': '400',
      'letter-spacing': '0px'
    },
    headline6: {
      'font-size': '20px',
      'font-weight': '500',
      'letter-spacing': '0.15px'
    },
    subtitle1: {
      'font-size': '16px',
      'font-weight': '400',
      'letter-spacing': '0.15px'
    },
    subtitle2: {
      'font-size': '14px',
      'font-weight': '500',
      'letter-spacing': '0.1px'
    },
    body1: {
      'font-size': '16px',
      'font-weight': '400',
      'letter-spacing': '0.5px'
    },
    body2: {
      'font-size': '14px',
      'font-weight': '400',
      'letter-spacing': '0.25px'
    },
    button: {
      'font-size': '14px',
      'font-weight': '500',
      'letter-spacing': '1.25px'
    },
    caption: {
      'font-size': '12px',
      'font-weight': '400',
      'letter-spacing': '0.4px'
    },
    overline: {
      'font-size': '10px',
      'font-weight': '400',
      'letter-spacing': '1.5px'
    }
  },
  zIndex: {
    fab: 100,
    alert: 120,
    modal: 140,
    spinner: 150
  },
  breakPoint: {
    mobile: 350,
    tablet: 800,
    desktop: 1281
  }
}
