import { useEffect, useState } from 'react';

const MessageSocketIoRooms = ({ socket }, nameRoom, nameUser, setErrorUsuarioExpulsado) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState(''); 

    useEffect(() => {
        // Unirse a la sala

        // Escuchar mensajes desde el servidor
        socket.on('message', (m) => {
          setShowMessage((prevMessages) => [...prevMessages, m]);
          console.log("aCA ESTA EL MENSAJE: ", m)
        });

          // Escuchar el evento de error desde el servidor
          socket.on('error', (error) => {
            setErrorUsuarioExpulsado(error.msg)
        });

        return () => {
          socket.off('message');
        };
      }, [nameRoom, socket]);

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
              socket.emit('message_room', { room: nameRoom, user: nameUser, message, FileData: {name:fileName ,file: files }});
              socket.off('message_room');
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


export default MessageSocketIoRooms;