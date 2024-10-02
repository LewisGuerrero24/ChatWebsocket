import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleGoOut from '../Helpers/handleGoOut';
import MessageSocketIoRooms from '../Hooks/MessageSocketIoRooms';
import Swal from 'sweetalert2';
import Chat from './UserProfile/Chat';



const ChatRoom = ({nameUser, nameRoom, connected, socket, initialMessages}) => {
  const [errorUsuarioExpulsado, setErrorUsuarioExpulsado] = useState("");
    const { message, setMessage, showMessage, sendMessage,setShowMessage,setFiles, fileName, setFileName} = MessageSocketIoRooms({ socket }, nameRoom, nameUser, setErrorUsuarioExpulsado);
    const navigate = useNavigate();
    const [allMessages, setAllMessages] = useState([]);
    const [nameNew, setNameNew] = useState("Nick");
  
    
    const handleGoOutCallback = () => {
        handleGoOut(nameUser, navigate);
    };

    useEffect(() => {
        setAllMessages([...initialMessages, ...showMessage]);

    }, [initialMessages, showMessage])


    useEffect(() => {
      if (errorUsuarioExpulsado) {
          Swal.fire({
              title: "Expulsado del Grupo",
              text: errorUsuarioExpulsado,
              icon: "error"
          });
          setErrorUsuarioExpulsado("");
      }
      
  }, [errorUsuarioExpulsado]);
 
  return (
    <Chat 
    setFileName={setFileName}  
    setMessage={setMessage} 
    setFiles={setFiles} 
    allMessages={allMessages} 
    sendMessage={sendMessage} 
    connected={connected}
    message={message}
    name={nameUser}
    fileName={fileName}
    nameNew={nameRoom}>
    </Chat>
  );
  
}

export default ChatRoom;