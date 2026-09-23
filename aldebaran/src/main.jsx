import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// ¡Esta es la línea clave que te falta!
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)