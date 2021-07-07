import { Theme } from 'styled-components'

export const defaultTheme: Theme = {
  general: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px'
  },
  colors: {
    palette: {
      primary: '#E8ACC2',
      secondary: '#878787',
      danger: '#FF4444',
      warning: '#FFBB33',
      success: '#00C851',
      info: '#33B5E5',
      placeHolder: 'rgba(0, 0, 0, 0.4)'
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
  }
}
