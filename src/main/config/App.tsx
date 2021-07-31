import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, Normalize, GlobalStyle } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'

export type AppProps = {
  children?: React.ReactNode
}

const App: FC<AppProps> = (props: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyle />
    {props.children}
    <ToastContainer />
  </ThemeProvider>
  )
}

export default App
