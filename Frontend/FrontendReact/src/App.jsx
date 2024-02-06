import io from 'socket.io-client'
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

export default App
