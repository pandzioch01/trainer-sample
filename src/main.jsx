import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NotFound from './NotFound.jsx'
import './styles.css'

const basePath = import.meta.env.BASE_URL
const normalizePath = (path) => path.replace(/\/+$/, '') || '/'
const currentPath = normalizePath(window.location.pathname)
const isHome = currentPath === normalizePath(basePath) || currentPath === normalizePath(`${basePath}index.html`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isHome ? <App /> : <NotFound />}
  </StrictMode>,
)
