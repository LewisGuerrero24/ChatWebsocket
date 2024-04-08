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
import DashboardUser from './Components/DashboardUser.jsx';
import CsrfProvider from './Components/CsrfProvider.jsx';


const router = createBrowserRouter([
  {

    path: "/",
    element: <App />,
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
    path: "/DashboardUser",
    element: <DashboardUser/>
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
<<<<<<< HEAD
=======
      <Toaster />
    </CsrfProvider>
>>>>>>> 104a428bd4922a54abf753d0df413a6773b4580a
  </React.StrictMode>

)
