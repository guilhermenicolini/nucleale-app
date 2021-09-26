import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, Normalize, GlobalStyle } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters'

export type AppProps = {
  children?: React.ReactNode
}

const App: FC<AppProps> = (props: AppProps) => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyle />
        {props.children}
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
}

export default App
