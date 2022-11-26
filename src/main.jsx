import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
<<<<<<< HEAD
import AuthProvider from './Context/AuthProvider'

import ThemeProvider from './Context/ThemeProvider'
=======
import UserContext from './Context/UserContext'
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
=======
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <App />
      </UserContext>
    </QueryClientProvider>
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c
  </React.StrictMode>
)
