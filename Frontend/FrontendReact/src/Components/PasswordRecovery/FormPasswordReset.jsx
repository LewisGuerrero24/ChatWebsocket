import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const FormPasswordReset = () => {
  const location = useLocation(); 
  const { token } = location.state || {}; 
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const navigate = useNavigate(); // No olvides usar useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmationPassword) {
      try {
        const response = await axios.post('http://localhost:5000/reset-password', {
          password,
          token
        }, { withCredentials: true }).then(response =>{
          console.log(response.data);
          if (response.data === true) {
            navigate('/login');
          }
        })

      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
      }



    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="h-screen bg-emerald-500 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">Reset Password</h1>
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="confirmpassword" className="block mb-1 text-gray-600 font-semibold">Confirm Password</label>
              <input
                type="password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full"
              />
            </div>
          </div>
          <button type="submit" className="mt-4 w-full bg-emerald-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Cambiar</button>
        </div>
      </form>
    </div>
  );
}

export default FormPasswordReset;
