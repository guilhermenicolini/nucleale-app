import ReactDOM from 'react-dom'
import App from '@/main/config/App'
import { Router } from '@/main/routes/router'

ReactDOM.render(
  <App>
    <Router />
  </App>,
  document.getElementById('main')
)
