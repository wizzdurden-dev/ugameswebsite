import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
// Initialize theme: default to dark if user has not chosen
try{
  const saved = localStorage.getItem('theme')
  if(saved === 'light') document.documentElement.classList.remove('dark')
  else document.documentElement.classList.add('dark')
}catch(e){}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
