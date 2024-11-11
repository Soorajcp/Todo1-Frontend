import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Todo'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';  
import Register from './Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)