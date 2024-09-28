import React from 'react'
import HandleSubmitListContact from '../../Helpers/HandleSubmitListContact';
import axios from 'axios';
import tokenUtils from '../../Hooks/utils';

const TypeListMap = (userOnline, selectedUser, data, typeList, name, setSelectedUser, socket, setStatusMessage, setInitialMessages, setNotificationStatus, setIsRoom) => {





  const handleUserClickRoom = (nameRoom) => {
    if (setSelectedUser) {
      setSelectedUser(nameRoom)
      handleSubmitRoom(name, nameRoom)
      setIsRoom(nameRoom)
    } else {
      console.error('setSelectedUser is not a function');
    }
  }


  const handleSubmitRoom = async (nameUserActually, nameRoom) => {
    await axios.post('http://localhost:5000/conversation/room/create', {
      nameUserActually,
      nameRoom
    }, {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${tokenUtils.getToken()}` // Aquí agregas el token en el encabezado
      }
    })
      .then(response => {
        const idRoomUnited = response.data.room; // Asegúrate de obtener el nombre de la sala del servidor
        socket.emit('join_room_users', { room: idRoomUnited });

        if (response.data.success === true) {
          const apiUrl = 'http://localhost:5000/conversation/room/history';

          axios.get(apiUrl, {
            headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
            params: {
              nameUserActually,
              nameRoom
            }
          }).then(response => {
            setInitialMessages([...response.data]); // Cargar los mensajes iniciales en la conversación
          });
        }

      })
      .catch(error => {
        console.error("Error al registrar la sala: ", error);
      });
  };




  const handleUserClick = (userName) => {
    console.log(data)
    if (setSelectedUser) { // Verifica que setSelectedUser es una función
      setSelectedUser(userName);
      HandleSubmitListContact(name, userName, socket, setStatusMessage, setInitialMessages, setNotificationStatus)
    } else {
      console.error('setSelectedUser is not a function');
    }
  }
  if (!Array.isArray(data)) {
    console.error("El dato no es un array", data);
    return null;
  }

  if (typeList === "room") {

    return data.map(item => (
      <button
        key={item.id}
        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
        onClick={() => handleUserClickRoom(item.name)}
      >
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-2 text-sm font-semibold">{item.name}</div>
        <div className="h-3 w-3 bg-green-500 rounded-full ml-2"></div>
      </button>
    ))
  }
  if (typeList === "estudiante" || typeList === "docente") {
    return data.map(item => (

      <button
        key={item.id}
        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
        onClick={() => handleUserClick(item.name)}
      >
        <div className="relative flex items-center justify-center h-10 w-10 bg-indigo-300 rounded-full text-white font-bold">
          {item.name.charAt(0).toUpperCase()}

          {selectedUser !== item.name && item.CountMessages > 0 && (
            <div className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
              {item.CountMessages}
            </div>
          )}

        </div>

        <div className="ml-3 text-sm font-semibold text-gray-700">{item.name}</div>



        {userOnline.length === 0 ? (
          <div className="h-3 w-3 bg-red-500 rounded-full ml-2"></div>
        ) : (
          userOnline.some(user => user.id === item.id) ? (
            <div className="h-3 w-3 bg-green-500 rounded-full ml-2"></div>
          ) : (
            <div className="h-3 w-3 bg-red-500 rounded-full ml-2"></div>// Agrega un div para manejar el caso cuando no coincida
          )
        )}


      </button>

    ))
  }
}

export default TypeListMap;