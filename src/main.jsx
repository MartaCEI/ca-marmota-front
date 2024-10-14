import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/lib/routes/routes'
import '@/css/index.css'
import '@/css/header.css'
import '@/css/Register.css'
import '@/css/sections.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
