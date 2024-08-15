import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
// import * as bootstrap from 'bootstrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
