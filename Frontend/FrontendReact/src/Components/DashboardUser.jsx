import React, { useEffect, useState } from 'react';
import tokenUtils from "../Hooks/utils";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import ListContact from './UserProfile/ListContact';
import './css/chat.css';
import Chat from './Chat';
import useRoom from '../Hooks/useRoom';
import useConnect from '../Hooks/useConnect';

const DashboardUser = () => {
    const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
    const user = tokenUtils.getLoggedInUserId();
    const navigate = useNavigate();
    const [lastActive, setLastActive] = useState(new Date());
    const { connected, socket } = useConnect();
    const { name, Room } = useParams();
    const [urlRoom, setUrlRoom] = useState(Room);;

    const handleLogout = async () => {
        try {
            // Realiza una solicitud POST a la ruta /logout para cerrar sesión
            await axios.post('http://localhost:5000/logout');
            
            // Elimina el token del almacenamiento local
            tokenUtils.removeToken();
            setLastActive(new Date());
            // Redirige al usuario a la página de inicio
            navigate('/');

        // Reemplaza la entrada actual del historial con la página de inicio
        window.history.pushState({}, '', '/');
        
        // Recarga la página para asegurarse de que se aplique el cambio en el historial
        window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }



    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn && (new Date() - lastActive) >= 2 * 60 * 1000) {
                handleLogout();
            }
        }, 1000);

        const handleInteraction = () => {
            setLastActive(new Date());
        };

        // Agregar listeners de eventos al document
        document.addEventListener('mousemove', handleInteraction);
        document.addEventListener('keypress', handleInteraction);

        return () => {
            clearInterval(interval);
            // Eliminar los listeners de eventos al desmontar el componente
            document.removeEventListener('mousemove', handleInteraction);
            document.removeEventListener('keypress', handleInteraction);
        };
    }, [isLoggedIn, lastActive, navigate]);



    useEffect(() => {
      if (!isLoggedIn) {
          navigate('/');
      }
  }, [isLoggedIn]);

    return (
        <>
            <nav>
                {isLoggedIn && (
                    <>
                        <div className="flex h-screen antialiased text-gray-800">
                            <div className="flex flex-row h-full w-full overflow-x-hidden">
                                <ListContact connected={connected} name={name}/>
                                <h1>{name}</h1>
                                <Chat key={urlRoom} name={name} connected={connected} socket={socket} nameRoom={urlRoom}></Chat>
                            </div>
                        </div>
                        <button onClick={handleLogout}>Cerrar sesión</button> 
                    </>
                )}
            </nav>
        </>
    );
}

export default DashboardUser;
