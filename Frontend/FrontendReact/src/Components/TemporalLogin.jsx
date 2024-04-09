import React, { useState } from 'react'
import './css/temporalLogin.css';
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
      <form  className='formT'  onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
        <button>Ingresar</button>
      </form>
      
    </>
  )
}

export default TemporalLogin
