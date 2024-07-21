import React, { useEffect, useState } from 'react';
import tokenUtils from "../Hooks/utils";
import { useNavigate } from 'react-router-dom';
import logoutUsers from "../Helpers/logoutUsers";

const DashboardDocente = () => {
    const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
    const user = tokenUtils.getLoggedInUserId();
    const navigate = useNavigate();
    const [lastActive, setLastActive] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn && (new Date() - lastActive) >= 2 * 60 * 1000) {
                logoutUsers(setLastActive, navigate);
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

  const handleLogout = () => {
    logoutUsers(setLastActive, navigate);
  };

    return (
        <>
            <h1>Holaaaa Docente</h1>
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

export default DashboardDocente;
