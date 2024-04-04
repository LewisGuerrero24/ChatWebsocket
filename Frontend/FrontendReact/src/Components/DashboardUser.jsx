import React, { useEffect, useState } from 'react';
import tokenUtils from "../Hooks/utils";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const DashboardUser = () => {
    const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
    const user = tokenUtils.getLoggedInUserId();
    const navigate = useNavigate();
    const [lastActive, setLastActive] = useState(new Date());

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
            <h1>Holaaaa User</h1>
            <nav>
                {isLoggedIn && (
                    <>
                        <div>Bienvenido <b>{user}</b></div>
                        <button onClick={handleLogout}>Cerrar sesión</button> 
                    </>
                )}
            </nav>
        </>
    );
}

export default DashboardUser;
