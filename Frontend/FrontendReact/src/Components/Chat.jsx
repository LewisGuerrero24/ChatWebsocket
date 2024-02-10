import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './css/chat.css';

const socket = io('http://localhost:5000');
let  id = 0
const Chat = () => {
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(socket.connected);
  const [showMessage, setShowMessage] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage(''); // Limpiar el input después de enviar el mensaje
  };

  const connect = () => {
    socket.on('server_status', (m) => {
      console.log(m);
      setConnected(m);
    });
  };

  useEffect(() => {
    socket.on('message', (m) => {
      console.log(m);
      setShowMessage((prevMessages) => [...prevMessages, { id: id++, message: m }]);
    });
    connect();


    return () => {
      socket.off('message');
      socket.off('server_status');
    };
  }, []);

  
  return (
    <>
      {connected ? (
        <form className='chat-general' onSubmit={handleSubmit}>
          <ol className='chat-general-global-messages'>
            {showMessage.map((msg) => (
              <li  className='message-chat' key={msg.id}>{msg.message}</li>
            ))}
          </ol>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>send</button>
        </form>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Chat;
