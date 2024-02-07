import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000/')

const Chat = () => {
    const [message,setMessage ] = useState('')

  const handlesubmit =(e) => {
    e.preventDefault()
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', (message) =>console.log(message))
  },[])

  return (
    <div>
    <form onSubmit={handlesubmit}>
      <input type="text" onChange={ e => setMessage(e.target.value)} />
      <button>send</button>

    </form>
  </div>
  )
}

export default Chat
