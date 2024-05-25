// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
      toast.error('Las contraseñas no coinciden', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        password,
      }, { withCredentials: true });


      console.log(response.data); 
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      toast.success('Registro exitoso', {
        position: "bottom-right",
        style: {
          background: "green",  
          color: "#fff",       
        },
      });

    } catch (error) {
      console.log('Error during registration:', error);
    }
  };


  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" value={name} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>Confirm Password
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <Link to="/">Ir al Inicio</Link>
    </div>
  );
};

export default Register;
