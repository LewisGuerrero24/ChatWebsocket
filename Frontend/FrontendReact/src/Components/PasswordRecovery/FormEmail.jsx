import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

const FormEmail = () => {
    const [email,setEmail] = useState()

    const handleSubmit = async(e) => { 
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/forgot-password', {
            email
          }, { withCredentials: true}).then(response =>{
            console.log(response.data)
          })
    }


  return (
    <div className="h-screen bg-emerald-500 flex justify-center items-center w-full">
  <form onSubmit={handleSubmit}> 
    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-gray-600">Ingresa Correo Electronico</h1>
        <div>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      <button  type="submit" className="mt-4 w-full bg-emerald-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Enviar</button>
    </div>
  </form>
</div>
  )
}

export default FormEmail