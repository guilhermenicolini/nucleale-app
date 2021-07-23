import { createGlobalStyle, Theme } from 'styled-components'
import 'react-toastify/dist/ReactToastify.min.css'

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    font-family: ${({ theme }) => theme.general.fontFamily};
    font-size: ${({ theme }) => theme.general.fontSize};
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    .Toastfy__toast {
      box-shadow: ${(props) => props.theme.general.boxShadow};
    }
    .Toastify__toast--info {
      background-color: ${({ theme }) => theme.colors.palette.info.color};
    }
    .Toastify__toast--success {
      background-color: ${({ theme }) => theme.colors.palette.success.color};
    }
    .Toastify__toast--warning {
      background-color: ${({ theme }) => theme.colors.palette.warning.color};
      color: ${({ theme }) => theme.colors.dark.highEmphasis};
      & svg path {
        fill: ${({ theme }) => theme.colors.dark.highEmphasis};
      }
    }
    .Toastify__toast--error {
      background-color: ${({ theme }) => theme.colors.palette.danger.color};
    }
  }
`
