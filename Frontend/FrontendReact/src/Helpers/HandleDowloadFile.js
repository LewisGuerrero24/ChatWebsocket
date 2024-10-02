import axios from 'axios';
import React from 'react'
import tokenUtils from '../Hooks/utils';

const HandleDowloadFile = async(id_file,name) => {
    console.log(id_file);
    const token = localStorage.getItem('token'); // Suponiendo que tienes el JWT guardado en el localStorage

    try {
        const response = await axios.get(`http://localhost:5000/files/download`, {
            headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
            params: {
                id_file
            },
            responseType: 'blob'  // Asegúrate de recibir el archivo como blob
        });

        if (response.status !== 200) {
            throw new Error('Error descargando el archivo');
        }

        const blob = new Blob([response.data], { type: response.data.type });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = name;  // Puedes ajustar el nombre del archivo si lo deseas
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error descargando archivo:', error);
    }
}

export default HandleDowloadFile