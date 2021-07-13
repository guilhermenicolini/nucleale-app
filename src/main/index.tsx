import ReactDOM from 'react-dom'
import { Normalize } from '@/presentation/styles/normalize'
import { GlobalStyle } from '@/presentation/styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles/theme'

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyle />
    <div>App running</div>
  </ThemeProvider>,
  document.getElementById('main')
)
