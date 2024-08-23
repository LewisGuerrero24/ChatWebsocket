import { useEffect, useState } from 'react';

const MessageSocketIoUsers = ({ socket }, nameSend, name) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState([]);
  const [room, setRoom] = useState('');

  useEffect(() => {
    // Generar la sala única entre los dos usuarios
    const generatedRoom = `chat_${Math.min(name, nameSend)}_${Math.max(name, nameSend)}`;
    setRoom(generatedRoom);

    // Unirse a la sala
    socket.emit('join', { room: generatedRoom });

    // Escuchar mensajes desde el servidor
    socket.on('message', (m) => {
      console.log(m)
      setShowMessage((prevMessages) => [...prevMessages, m]);
    });

    return () => {
      // Abandonar la sala cuando el componente se desmonte
      socket.emit('leave', { room: generatedRoom });
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

