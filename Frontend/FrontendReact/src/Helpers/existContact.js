import axios from 'axios';

const existContact = async (name, id) => {
    try {
        const response = await axios.put('http://localhost:5000/exist/contact', {
            name,
            id
        }, { withCredentials: true });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error al verificar el contacto:", error);
        return null; // Maneja el error como mejor te convenga
    }
}

export default existContact;
