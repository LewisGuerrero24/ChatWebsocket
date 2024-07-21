import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importa la librería js-cookie
import { toast } from "react-hot-toast";  
import tokenUtils from "../Hooks/utils";



const Login = () => {
 // Estados para manejar los valores del formulario
 const [name, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [loggedIn, setLoggedIn] = useState(false);
 const navigate = useNavigate();


 // Función para manejar el envío del formulario de login
 const handleSubmit = async (e) => {
    e.preventDefault();
    tokenUtils.removeToken();

    
    try{
      const response = await axios.post('http://localhost:5000/Login', {
        name,
        password,
      }, { withCredentials: true});

      if(response.status === 200){
        setLoggedIn(true);
        tokenUtils.setToken(response.data.token);
        console.log(tokenUtils.getToken());


        if(response.data.rol  === 'admin'){
          navigate('/DashboardAdmin');
        } else if(response.data.rol === 'estudiane'){
          navigate('/DashboardEstudiante');
        }else{
          navigate('DashboardDocente');
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

<div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
  <form onSubmit={handleSubmit}> 
    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-gray-600">Log In</h1>
        <div>
          <label for="username" className="block mb-1 text-gray-600 font-semibold">Username</label>
          <input type="text" value={name} onChange={(e) => setUsername(e.target.value)}  className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label for="email" className="block mb-1 text-gray-600 font-semibold">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      <button  type="submit" className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Iniciar</button>
    </div>
    <Link to="/register">Registrate</Link>
  </form>
</div>

);
};

export default Login
