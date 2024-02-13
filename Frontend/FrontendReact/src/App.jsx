import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './Components/css/login.css';
import Login from './Components/Login'; 
import Register from './Components/Register';
import ResoursLink from './Components/resoursLink';
import './index.css';

function App() {
  return (
    <>
  <ResoursLink/>
    </>
  );
}

export default App;














/*import io from 'socket.io-client'
import './App.css'
import { useEffect, useState } from 'react'

const socket = io('http://localhost:5000/')

function App() {
  const [message,setMessage ] = useState('')

  const handlesubmit =(e) => {
    e.preventDefault()
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', (message) =>console.log(message))
  },[])

  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <input type="text" onChange={ e => setMessage(e.target.value)} />
          <button>send</button>

        </form>
      </div>
      
    </>
  )
}

export default App*/
