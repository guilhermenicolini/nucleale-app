import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '@/presentation/pages/login/Login'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles/theme'

describe('Login Component', () => {
  test('Should not render spinner on start', () => {
    render(<ThemeProvider theme={defaultTheme}><Login /></ThemeProvider>)
    expect(document.querySelector('.spinner')).toBeFalsy()
  })
})
