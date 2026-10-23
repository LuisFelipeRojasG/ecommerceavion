import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Restaura la ruta solicitada cuando GitHub Pages sirve public/404.html
// y redirige a la raíz del sitio.
try {
  const redirectPath = sessionStorage.getItem('redirectPath')
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath')
    const base = import.meta.env.BASE_URL
    window.history.replaceState(null, '', `${base}${redirectPath.replace(/^\/+/, '')}`)
  }
} catch (error) {
  console.log(error)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
