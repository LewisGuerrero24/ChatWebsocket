import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import useRoom from '../Hooks/useRoom';
import useConnect from '../Hooks/useConnect';

const TemporalLogin = () => {

  const [name, setName] = useState('');
  const {socket} = useConnect();
  const {joinRoom,statusRoom, urlRoom} = useRoom({socket},"Public");
  const navigate = useNavigate();

  const handleSubmit = async(e) => { 
    e.preventDefault();
    console.log(name)
    try {

     const response = await axios.post('http://localhost:5000/chat/resource', {
        name
      }, { withCredentials: true});

      joinRoom();
      if (response.status === 201 && statusRoom==true) {   

          navigate(`/chat/${urlRoom}/${name}`,{replace: true})  
          console.log('Usuario a Ingresado Sala Publica');

      } else {
        navigate('/',{replace: true})
        console.error('Error al eliminar el recurso:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }    
  }

  return (
    <>
      {/* <form  className='formT'  onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
        <button>Ingresar</button>
      </form>
       */}

<div class="h-screen bg-emerald-500 flex justify-center items-center w-full">
  <form onSubmit={handleSubmit}> 
    <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div class="space-y-4">
        <h1 class="text-center text-2xl font-semibold text-gray-600">Log In</h1>
        <div>
          <label for="username" class="block mb-1 text-gray-600 font-semibold">Username</label>
          <input ype="text" value={name} onChange={(e)=> setName(e.target.value)}  class="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      <button  type="submit" class="mt-4 w-full bg-emerald-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Iniciar</button>
    </div>
  </form>
</div>
    </>
  )
}

export default TemporalLogin
