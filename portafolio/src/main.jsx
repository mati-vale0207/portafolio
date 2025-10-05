import { StrictMode } from 'react'  //importacion de react
import { createRoot } from 'react-dom/client'    //renderiza e inicia hacia el navegador
import './index.css'  //importacion de css
import App from './App.jsx'   //conexion de app y sus componentes


//detect malas practicas durante el desarrollo
//root hacia el index donde react monta todo el codigo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
