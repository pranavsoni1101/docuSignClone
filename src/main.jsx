import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import { createBrowserRouter } from 'react-router-dom';
import Docs from './pages/Docs';
import UpdatePdf from './pages/UpdatePdf';
import PdfUpload from './pages/PdfUpload';
import Signature from './pages/Signature';
import EditPdf from './pages/EditPdf';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: '/login',
      element: <Login />
    } ,
    {
      path: '/docs',
      element: <Docs />
    } ,
    {
      path: '/update',
      element: <UpdatePdf />
    } ,
    {
      path: '/pdfupload',
      element: <PdfUpload />
    },
    {
      path: 'pdfUpload/:id',
      element: <EditPdf />
    },
    {
      path: '/signature',
      element: <Signature />
    }  
  ])

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)