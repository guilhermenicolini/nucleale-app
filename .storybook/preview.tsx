import React from 'react';
import { Normalize } from '../src/presentation/styles/normalize'
import { GlobalStyle } from '../src/presentation/styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/presentation/styles/theme'
import ToastContainer from '../src/presentation/components/toastr/ToastContainer'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Normalize />
      <GlobalStyle />
      <Story />
      <ToastContainer />
    </ThemeProvider>
  )
]