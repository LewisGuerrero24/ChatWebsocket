import React, { useEffect, useState } from 'react';
import tokenUtils from "../Hooks/utils";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const DashboardAdmin = () => {
    const isLoggedIn = tokenUtils.checkIfIsLoggedIn();   
    const user = tokenUtils.getLoggedInUserId();
    const navigate = useNavigate();
    const [lastActive, setLastActive] = useState(new Date());

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout');
            tokenUtils.removeToken();
            setLastActive(new Date());
            navigate('/');
            window.history.pushState({}, '', '/');
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
    }, [isLoggedIn, navigate]);

    return (
        <>
            <h1>Holaaaa Admin</h1>
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

export default DashboardAdmin;
