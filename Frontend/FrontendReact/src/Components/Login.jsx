import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Login = () => {
 // Estados para manejar los valores del formulario
 const [apodo, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [loggedIn, setLoggedIn] = useState(false);

 /*useEffect (() =>{
  const checkLoginStatus = async () => {
    try {
      // Realiza una solicitud al backend para verificar la sesión del usuario
      const response = await axios.get('http://localhost:5000/check_login', { withCredentials: true });

    if (response.data.logged_in) {
      setLoggedIn(true);
    }
    } catch (error) {
      console.log('Error checking login status: ', error)
    }

  }
  checkLoginStatus();
 }, [])*/

 // Función para manejar el envío del formulario de login
 const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5000/login', {
        apodo,
        password,
      }, { withCredentials: true });

      console.log(response.data);

      setLoggedIn(true);
    }catch(error){
      console.log('Error during login:', error);
    }
 };


  /*if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }*/


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
