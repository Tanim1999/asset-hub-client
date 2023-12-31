import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './ContextApi/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
    <AuthProvider>
    <HelmetProvider>
      <div className=" dark max-w-screen-xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
