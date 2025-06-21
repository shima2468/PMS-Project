import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import CountContextProvider from './Context/CountContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Toaster position="top-center" />
     <CountContextProvider>
    <App />
    </CountContextProvider>
  </StrictMode>,
)
