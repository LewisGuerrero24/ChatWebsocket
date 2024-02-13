import React, { useState } from 'react'
import './css/temporalLogin.css';
import {useNavigate} from "react-router-dom";

const TemporalLogin = () => {

  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(name)
    name ? navigate(`/chat/${name}`,{replace: true}) : navigate('/',{replace: true})
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
