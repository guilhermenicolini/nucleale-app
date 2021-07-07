import ReactDOM from 'react-dom'
import { Fragment } from 'react'
import { Normalize } from '@/presentation/styles/normalize'
import { GlobalStyle } from '@/presentation/styles/global'

ReactDOM.render(
  <Fragment>
    <Normalize />
    <GlobalStyle />
    <div>App running</div>
  </Fragment>,
  document.getElementById('main')
)
