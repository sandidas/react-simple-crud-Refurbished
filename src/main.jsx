import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import ThemeProvider from './Context/ThemeProvider'
import UserContext from './Context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContext>
        <App />
      </UserContext>
    </ThemeProvider>
  </React.StrictMode>
)
