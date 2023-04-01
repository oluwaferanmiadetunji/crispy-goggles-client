import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import router from './App'
import 'antd/dist/reset.css';
import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
