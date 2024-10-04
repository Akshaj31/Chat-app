import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import BasicChat from './components/BasicChat.jsx'


const router = createBrowserRouter([
  {
    path : "/", 
    element : <App />
  }, 
  {
    path : "messages", 
    element : <BasicChat />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
