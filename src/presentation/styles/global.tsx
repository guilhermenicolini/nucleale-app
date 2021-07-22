import { createGlobalStyle, Theme } from 'styled-components'
import 'react-toastify/dist/ReactToastify.min.css'

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    font-family: ${({ theme }) => theme.general.fontFamily};
    font-size: ${({ theme }) => theme.general.fontSize};
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    .Toastify__toast--info {
      background-color: ${({ theme }) => theme.colors.palette.info.color};
    }
    .Toastify__toast--success {
      background-color: ${({ theme }) => theme.colors.palette.success.color};
    }
    .Toastify__toast--warning {
      background-color: ${({ theme }) => theme.colors.palette.warning.color};
    }
    .Toastify__toast--error {
      background-color: ${({ theme }) => theme.colors.palette.danger.color};
    }
  }
`
