import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
/* Locale (i18n) */
import './locales'
// Router
import router from '@/router'
import {
  RouterProvider,
} from 'react-router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={ router } />
  // </React.StrictMode>
)
