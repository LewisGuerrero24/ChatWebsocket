import axios from "axios";
import tokenUtils from "../Hooks/utils";


const cantidadUsarios = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/user-counts", {
            headers: {
                authorization: `Bearer ${tokenUtils.getToken()}`
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        return {}; // Retorna un objeto vacío en caso de error
    }
};

export default cantidadUsarios;