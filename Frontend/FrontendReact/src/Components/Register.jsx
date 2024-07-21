import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Por favor selecciona un archivo', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('photo', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      console.log(response.data);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setFile(null);
      setPreview(null);
      toast.success('Registro exitoso', {
        position: "bottom-right",
        style: {
          background: "green",
          color: "#fff",
        },
      });

    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('Error durante el registro', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit}>
        <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div class="space-y-4">
            <h1 class="text-center text-2xl font-semibold text-gray-600">Register</h1>
            <div>
              <label for="username" class="block mb-1 text-gray-600 font-semibold">Username</label>
              <input type="text" value={name} onChange={(e) => setUsername(e.target.value)} class="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} class="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />

            {preview && (
              <div>
                <h3>Vista previa:</h3>
                <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
              </div>
            )}
          </div>
          <button type="submit" class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Registrar</button>
          <Link to="/">Ir al Inicio</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
