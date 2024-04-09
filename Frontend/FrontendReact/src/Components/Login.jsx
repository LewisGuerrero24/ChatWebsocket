import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importa la librería js-cookie
import { toast } from "react-hot-toast";  
import tokenUtils from "../Hooks/utils";



const Login = () => {
 // Estados para manejar los valores del formulario
 const [apodo, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [loggedIn, setLoggedIn] = useState(false);
 const navigate = useNavigate();


 // Función para manejar el envío del formulario de login
 const handleSubmit = async (e) => {
    e.preventDefault();
    tokenUtils.removeToken();

    
    try{
      const response = await axios.post('http://localhost:5000/Login', {
        apodo,
        password,
      }, { withCredentials: true});

      if(response.status === 200){
        setLoggedIn(true);
        tokenUtils.setToken(response.data.token);
        console.log(tokenUtils.getToken());


        if(response.data.rol  === 'admin'){
          navigate('/DashboardAdmin');
        } else {
          navigate('/DashboardUser');
        }

        toast.success('Login successful', {
          position: "bottom-right",
          style: {
            background: "green",  
            color: "#fff",       
          },
        });
        
      }

    }catch(error){
      if (error.response && error.response.status === 403 && error.response.data.remaining_time){
        const remainingTime = error.response.data.remaining_time;
        toast.error(`Account is temporarily locked. Please try again after ${Math.floor(remainingTime / 60)} minutes.`, {
          position: 'bottom-right',
          style: {
            background: 'red',
            color: '#fff',
          },
        });


      }else{
      toast.error('Invalid username or password', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
      }
    }
 };


return (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input type="text" value={apodo} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
    <Link to="/">Ir al Inicio</Link>
    <Link to="/Register">Register</Link>
  </div>
);
};

export default Login
