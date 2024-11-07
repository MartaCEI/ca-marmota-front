import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/lib/routes/routes'
import { UserProvider } from '@/hooks/useUser.jsx'
import '@/css/header.css'
import '@/css/index.css'
import '@/css/Register.css'
import '@/css/sections.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
