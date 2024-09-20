import { useEffect, useState } from 'react';

const MessageSocketIoUsers = ({ socket }, nameSend, name) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState([]);


  useEffect(() => {
    // Escuchar mensajes desde el servidor
    socket.on('message', (m) => {
      setShowMessage((prevMessages) => [...prevMessages, m]);

    });

    return () => {
      socket.off('message');
    };
  }, [name, nameSend, socket]);



  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emitir el mensaje al servidor
      socket.emit('message_user', { user_primary: name, user_second: nameSend, message });
      socket.off('message_user');
      setMessage(''); // Limpiar el campo de mensaje
    }
  };

  return {
    message,
    setMessage,
    showMessage,
    sendMessage,
    setShowMessage
  };
  
};

export default MessageSocketIoUsers;

