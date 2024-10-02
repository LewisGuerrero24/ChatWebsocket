import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const MessageSocketIoUsers = ({ socket }, nameSend, name) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState(''); 

  useEffect(() => {
    socket.on('message', (m) => {
      setShowMessage((prevMessages) => [...prevMessages, m]);
    });

    return () => {
      socket.off('message');
    };
  }, [name, nameSend, socket]);



  const sendMessage = () => {
    
if(message == "" && fileName == ""){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No puedes enviar mensajes vacios!"
  });
}else{
    message.trim()
      // Emitir el mensaje al servidor
      socket.emit('message_user', { user_primary: name, user_second: nameSend, message, FileData: {name:fileName ,file: files }});
      socket.off('message_user');
      setMessage(''); // Limpiar el campo de mensaje
      setFileName('');
}
  };

  return {
    message,
    setMessage,
    showMessage,
    sendMessage,
    setShowMessage,
    setFiles,
    setFileName,
    fileName
  };
  
};

export default MessageSocketIoUsers;

