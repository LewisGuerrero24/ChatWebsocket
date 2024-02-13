import React from 'react'
import ReactDOM from 'react-dom/client'
import './Components/css/login.css'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Chat from './Components/Chat.jsx'
=======
import Login from './Components/Login'; 
import Register from './Components/Register';
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom';

>>>>>>> maicol

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
<<<<<<< HEAD
  {
    path: "/chat/:name",
    element: <Chat/>,
=======
  /*{
    path: "/chat/:name",
    element: <Chat/>,
  },*/
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
>>>>>>> maicol
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <RouterProvider router={router} />
  </React.StrictMode>,
=======
    <RouterProvider router={router}/>
  </React.StrictMode>
>>>>>>> maicol
)
