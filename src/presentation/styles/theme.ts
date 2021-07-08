import { Theme } from 'styled-components'

export const defaultTheme: Theme = {
  general: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    borderRadius: '3px'
  },
  colors: {
    palette: {
      primary: '#E8ACC2',
      secondary: '#878787',
      danger: '#FF4444',
      warning: '#FFBB33',
      success: '#00C851',
      info: '#33B5E5',
      placeHolder: 'rgba(0, 0, 0, 0.4)',
      form: '#CED4DA'
    },
    light: {
      highEmphasis: '#FFFFFF',
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
      'font-weight': '300'
    },
    headline2: {
      'font-size': '60px',
      'font-weight': '300'
    },
    headline3: {
      'font-size': '48px',
      'font-weight': '400'
    },
    headline4: {
      'font-size': '34px',
      'font-weight': '400'
    },
    headline5: {
      'font-size': '24px',
      'font-weight': '400'
    },
    headline6: {
      'font-size': '20px',
      'font-weight': '500'
    },
    subtitle1: {
      'font-size': '16px',
      'font-weight': '400'
    },
    subtitle2: {
      'font-size': '14px',
      'font-weight': '500'
    },
    body1: {
      'font-size': '16px',
      'font-weight': '400'
    },
    body2: {
      'font-size': '14px',
      'font-weight': '400'
    },
    button: {
      'font-size': '14px',
      'font-weight': '500'
    },
    caption: {
      'font-size': '12px',
      'font-weight': '400'
    },
    overline: {
      'font-size': '10px',
      'font-weight': '400'
    }
  }
}
