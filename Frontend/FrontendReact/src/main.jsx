import React from 'react'
import ReactDOM from 'react-dom/client'
import './Components/css/login.css'
import App from './App.jsx'
import './index.css'
import PublicChat from './Components/PublicChat.jsx'
import Login from './Components/Login'; 
import Register from './Components/Register';
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom';
import TemporalLogin from './Components/TemporalLogin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/temporallogin",
    element: <TemporalLogin/>,
  },
  {
    path: "/Chat/Public/:name",
    element: <PublicChat/>,
  }
  ,
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
   
)
