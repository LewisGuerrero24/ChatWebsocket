import axios from "axios";
import tokenUtils from "../Hooks/utils";

const listarEstudiantes = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/usuario", {
            headers: {
                authorization: `Bearer ${tokenUtils.getToken()}`
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        return []; // Retorna un array vacío en caso de error para evitar problemas en el componente
    }
};

export default listarEstudiantes;
