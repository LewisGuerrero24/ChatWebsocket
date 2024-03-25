import React, { useEffect, useState } from 'react';
import ConnectSocketIo from '../Hooks/ConnectSocketIo';
import './css/chat.css';
import MessageSocketIo from '../Hooks/MessageSocketIo';
import {useParams} from "react-router-dom";



const Chat = () => {

  let {name} = useParams()
  const {connected,socket} = ConnectSocketIo();
  const{message, setMessage,showMessage, handleSubmit} = MessageSocketIo({socket}, name);

  return (
    <>
      {connected ? (
        <form className='chat-general' onSubmit={handleSubmit}>
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
          <button>Salir</button>
        </form>
        
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Chat;
