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
import { Toaster } from 'react-hot-toast';
import DashboardAdmin from './Components/DashboardAdmin.jsx';
import DashboardEstudiante from './Components/DashboardEstudiante.jsx'
import DashboardDocente from './Components/DashboardDocente.jsx'
import CsrfProvider from './Components/CsrfProvider.jsx';
import FormEmail from './Components/PasswordRecovery/FormEmail.jsx'
import { FormToken } from './Components/PasswordRecovery/FormToken.jsx'
import FormPasswordReset from './Components/PasswordRecovery/FormPasswordReset.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{

    path: "/password-reset",
    element: <FormPasswordReset/>,
  },{

    path: "/confirmation-token",
    element: <FormToken />,
  },{

    path: "/forgot-password",
    element: <FormEmail />,
  },
  {
    path: "/temporallogin",
    element: <TemporalLogin/>,
  }
  ,
  {
    path: "/Chat/:Room/:name",
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

  },
  {
    path: "/DashboardAdmin",
    element: <DashboardAdmin/>
  },
  {
    path: "/DashboardEstudiante/:name",
    element: <DashboardEstudiante/>
  },
  {
    path: "/DashboardDocente",
    element: <DashboardDocente/>
  },
  // {
  //   path: "/DashboardUser/:name",
  //   element: <DashboardUser/>
  // }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CsrfProvider>
      <RouterProvider router={router} />
    </CsrfProvider>
    <Toaster />
  </React.StrictMode>

)