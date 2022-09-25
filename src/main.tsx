import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@topotal/topotal-ui'
import { Popup } from './Popup'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Popup />
    </ThemeProvider>
  </React.StrictMode>
)
