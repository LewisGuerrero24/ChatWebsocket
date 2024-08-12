import tokenUtils from "../Hooks/utils";
import axios from 'axios';

const TokenJwtUpdate = {
  initTokenRefresh: () => {
    
    const refreshTokenErrorHandler = (error) => {
      // Manejar errores específicos de actualización de token
      if (error.response && error.response.status === 401) {
        // El token de actualización es inválido, redirige al usuario a la página de inicio de sesión
        console.error('Token de actualización inválido');
      } else {
        // Manejar otros errores de solicitud
        console.error('Error al actualizar el token:', error);
      }
      return Promise.reject(error);
    };

    if(tokenUtils.checkIfIsLoggedIn()){
      axios.interceptors.response.use(
        (response) => {
          // Verificar si la respuesta contiene un nuevo token JWT
          
          const newToken = response.data.token;
          if (newToken) {
            // Actualizar el token en la cookie
            tokenUtils.setToken(newToken);
          }
          return response;
        },
        (error) => refreshTokenErrorHandler(error)
      );
    }



  },
};

export default TokenJwtUpdate;