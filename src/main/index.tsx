import ReactDOM from 'react-dom'
import { Normalize } from '@/presentation/styles/normalize'
import { GlobalStyle } from '@/presentation/styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles/theme'
import ToastContainer from '@/presentation/components/toastr/ToastContainer'

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyle />
    <div>App running</div>
    <ToastContainer />
  </ThemeProvider>,
  document.getElementById('main')
)
