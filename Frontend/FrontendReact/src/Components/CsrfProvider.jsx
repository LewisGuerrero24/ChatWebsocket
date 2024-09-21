// CsrfProvider.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TokenJwtUpdate from './TokenJwtUpdate';
import tokenUtils from "../Hooks/utils";

const CsrfProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
  const whoUser = tokenUtils.getLoggedInUseRol();

  useEffect(() => {
    // Inicializar el interceptor de respuesta para actualizar el token JWT
     TokenJwtUpdate.initTokenRefresh();

    // Recupera el token CSRF del almacenamiento local al cargar la aplicación
    const storedCsrfToken = localStorage.getItem('csrfToken');
    
    if (storedCsrfToken) {
      setCsrfToken(storedCsrfToken);
      axios.defaults.headers.common['X-CSRFToken'] = storedCsrfToken;
      console.log("CSRF Token old:", storedCsrfToken);
    } else {
      fetchCsrfToken(); // Si el token no está almacenado, obtén uno nuevo
    }  
    // Define la función para limpiar el token CSRF al cerrar la aplicación
    const clearCsrfToken = () => {
      localStorage.removeItem('csrfToken');
    };
  
    // Agrega un event listener para detectar el cierre de la aplicación
    window.addEventListener('beforeunload', clearCsrfToken);
  
    // Elimina el event listener al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', clearCsrfToken);
    };
  }, []);



  useEffect(() => {   
    const currentPath = window.location.pathname;
   
    if (isLoggedIn && currentPath === '/') {
       if(whoUser === "estudiante"){
        let nombreSession = localStorage.getItem('nombreDeSession')
        window.location.href = "/DashboardEstudiante/"+nombreSession;
       }else if (whoUser === "docente"){
        window.location.href = "/DashboardDocente";
       }else{
        window.location.href = "/DashboardAdmin";
       }
    }
  }, [isLoggedIn]);
  

  

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/csrf_token', { withCredentials: true });
      const token = response.data.csrf_token;
      setCsrfToken(token);
      axios.defaults.headers.common['X-CSRFToken'] = token;
      // Almacena el token CSRF en el almacenamiento local para su uso posterior
      localStorage.setItem('csrfToken', token);
      console.log("CSRF Token New:", token);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };
  

  return <>{children}</>;
};

export default CsrfProvider;
