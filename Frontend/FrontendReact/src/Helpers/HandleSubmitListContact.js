import axios from 'axios';
import React from 'react'
import tokenUtils from '../Hooks/utils';

const HandleSubmitListContact = async (user_one, user_two, socket, setStatusMessage, setInitialMessages, setNotificationStatus) => {


    await axios.post('http://localhost:5000/conversation/create', {
        user_one,
        user_two
    }, { withCredentials: true }).then(response => {
        const roomName = response.data.room; // Asegúrate de obtener el nombre de la sala del servidor

        // Emitir el evento para unirse a la sala
        socket.emit('join_room_event', { room: roomName });

        setStatusMessage(response.data);

        if (response.data.success === true) {

            const apiUrl = 'http://localhost:5000/conversation/message';

            axios.get(apiUrl, {
                headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
                params: {
                    user_one,
                    user_two
                }
            }).then(response => {
                setInitialMessages([...response.data]); // Cargar los mensajes iniciales en la conversación
            });

            axios.put('http://localhost:5000/update/statusMessage', {
                user_one,
                user_two
            }, { withCredentials: true }).then(response => {
                console.log("mensajes vistos" + response.data)
                setNotificationStatus(response.data);
            })

        }
    });
}



export default HandleSubmitListContact