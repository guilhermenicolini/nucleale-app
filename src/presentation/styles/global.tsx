import { createGlobalStyle, Theme } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    font-family: ${({ theme }) => theme.general.fontFamily};
    font-size: ${({ theme }) => theme.general.fontSize};
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`
