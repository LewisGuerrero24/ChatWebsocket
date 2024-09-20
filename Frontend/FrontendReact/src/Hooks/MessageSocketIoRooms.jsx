import { useEffect, useState } from 'react';

const MessageSocketIoRooms = ({ socket }, nameRoom, nameUser) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);

    useEffect(() => {
        // Unirse a la sala

        // Escuchar mensajes desde el servidor
        socket.on('message', (m) => {
          setShowMessage((prevMessages) => [...prevMessages, m]);
        });

        return () => {
          socket.off('message');
        };
      }, [nameRoom, socket]);

      const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
          // Emitir el mensaje al servidor en la sala
          socket.emit('message_room', { room: nameRoom, user: nameUser, message });
          socket.off('message_room');
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


export default MessageSocketIoRooms;