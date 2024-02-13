// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [apodo, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        apodo,
        password,
      }, { withCredentials: true });

      console.log(response.data); // Maneja la respuesta del backend según tus necesidades
      setUsername("");
      setPassword("");

    } catch (error) {
      console.log('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" value={apodo} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <Link to="/">Ir al Inicio</Link>
    </div>
  );
};

export default Register;
