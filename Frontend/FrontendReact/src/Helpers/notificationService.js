import axios from 'axios';
import tokenUtils from '../Hooks/utils';

const notificationService = async(user_one, user_two) => {
    const apiUrl = 'http://localhost:5000/notification/newmessage';
    
    try {
        const response = await axios.get(apiUrl, { 
            headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
            params: {
                user_one,
                user_two
            } 
        });
        // Verificar si data es un array y tiene al menos un elemento
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0]; 
        } else {
            return null; // Si no hay datos, retorna null o maneja según tu lógica
        }
    } catch (error) {
        console.error('Error fetching notifications:', error.message || error);
        return null; // Retorna null en caso de error
    }
}

export default notificationService;
