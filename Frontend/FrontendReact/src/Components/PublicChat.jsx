import React, { useEffect, useState } from 'react';
import { useNavigate, useParams , Link, BrowserRouter} from "react-router-dom";
import './css/chat.css';
import Chat from './Chat';
import useRoom from '../Hooks/useRoom';
import useConnect from '../Hooks/useConnect';

const PublicChat = () => {
  const { connected, socket } = useConnect();
  const { name, Room } = useParams();
  const [urlRoom, setUrlRoom] = useState(Room);;

  return (
    <>
    <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      {/* Aquí se utiliza la key prop para forzar la recarga del componente Chat */}
      <Chat key={urlRoom} name={name} connected={connected} socket={socket} nameRoom={urlRoom}></Chat>
    </div>
    </div>
      
    </>
  );
};

export default PublicChat;
