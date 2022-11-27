import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './Context/ThemeProvider'
import UserContext from './Context/UserContext'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserContext>
          <App />
        </UserContext>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
