import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1a1a1a', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', fontFamily: 'Jost, sans-serif', fontSize: '13px' },
        success: { iconTheme: { primary: '#d4af37', secondary: '#0a0a0a' } },
      }} />
    </BrowserRouter>
  </React.StrictMode>
)
