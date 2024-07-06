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
    <div class="h-screen bg-emerald-400 flex justify-center items-center w-full">
      {connected ? (
        <>
        <form className='chat-general' onSubmit={sendMessage}>
        <label>{name}</label>
          <div className='h-96 w-96 border border-solid border-slate-500  bg-slate-300 '>
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
      </div>
    </>
  )
}

export default Chat
