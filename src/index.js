import 'normalize.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Providers from './components/Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
