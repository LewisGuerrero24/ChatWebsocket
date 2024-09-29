import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';



const tokenUtils = {
    //// getToken: () => {
    //     if (typeof localStorage !== 'undefined'){
    //         return localStorage.getItem("token");
    //     }
    // },

    getToken: () => {
        return Cookies.get('token');
      },
      

    //// setToken: (token) => {
    //     if (typeof localStorage !== 'undefined'){
    //         return localStorage.setItem("token", token);
    //     }
    // },
    setToken: (token) => {
        // Configura las opciones de la cookie
        const options = {
          expires: 1, // Duración de la cookie en días
          secure: true, // Asegura que la cookie solo se transmita a través de HTTPS
          sameSite: 'strict', // Protección adicional contra ataques CSRF
        };
        Cookies.set('token', token, options);
      },


    //// removeToken: () => {
    //     if (typeof localStorage !== 'undefined'){
    //         return localStorage.removeItem("token");
    //     }
    // },
    removeToken: () => {
        Cookies.remove('token');
      },



    checkIfIsLoggedIn: () => {
        const token = tokenUtils.getToken();

        if (!token){
            return false;
        }

        const decodedToken = jwtDecode(token);
        var dateNow = new Date();
        if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
            return false;
        }
        return true
    },




    getLoggedInUserId: () => {
        const token = tokenUtils.getToken();
        if (!token){
            return "";
        }
        return jwtDecode(token).sub;
    },


    getLoggedInUseRol: () => {
        const token = tokenUtils.getToken();
        if (!token){
            return "";
        }

        return jwtDecode(token).rol;
    }
};

export default tokenUtils;