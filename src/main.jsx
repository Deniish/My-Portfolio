import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RippleBackground from './Design/RippleBackground.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RippleBackground /> */}
    <App />
  </StrictMode>,
)
