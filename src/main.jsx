import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/lib/routes/routes'
import { UserProvider } from '@/hooks/useUser.jsx'
import '@/css/index.css'
import '@/css/register.css'
import '@/css/tablas.css'
import { PageInfoProvider } from './hooks/usePageInfo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageInfoProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </PageInfoProvider>
  </StrictMode>,
)
