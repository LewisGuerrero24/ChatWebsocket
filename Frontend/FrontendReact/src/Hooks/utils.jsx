import { jwtDecode } from "jwt-decode";



const tokenUtils = {
    getToken: () => {
        if (typeof localStorage !== 'undefined'){
            return localStorage.getItem("token");
        }
    },

    setToken: (token) => {
        if (typeof localStorage !== 'undefined'){
            return localStorage.setItem("token", token);
        }
    },


    removeToken: () => {
        if (typeof localStorage !== 'undefined'){
            return localStorage.removeItem("token");
        }
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