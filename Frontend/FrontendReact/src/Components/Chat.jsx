import React, { useState } from 'react'
import MessageSocketIo from '../Hooks/MessageSocketIo';
import {useNavigate} from "react-router-dom";
import image from '../Static/img/Carga.gif'
import handleGoOut from '../Helpers/handleGoOut';


const Chat = ({name, connected, socket, nameRoom}) => {
  
  const{message, setMessage,showMessage, sendMessage} = MessageSocketIo({socket}, name, nameRoom);
  
  const navigate = useNavigate()

  const handleGoOutCallback = () => {
    handleGoOut(name, navigate);
  };

  return (
    <>
      {connected ? (
        <>
        <form className='chat-general' onSubmit={sendMessage}>
        <label>{name}</label>
          <div className='chat-general-global-messages'>
          {showMessage.map((msg) => (
              <div className='container-message' key={msg.id}>
                <p className='container-message-name'>{msg.name}</p>
                {msg.message.length > 0 && (
                    <p className='message-chat'>{" " + msg.message[msg.message.length - 1]}</p>
                  ) }
              </div>
            ))}
          </div>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>send</button>
        </form>
         <button onClick={handleGoOutCallback}>Salir</button>
         </>
        
      ) : (
        <>
        <div >
          
          <p><img src={image} alt="Imagen de Carga" /></p>
        </div>
        
        </>
      )}
    </>
  )
}

export default Chat
