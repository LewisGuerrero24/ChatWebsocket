import React, { useEffect, useState } from 'react'
import HandleSubmitListContact from '../../Helpers/HandleSubmitListContact';
import axios from 'axios';
import tokenUtils from '../../Hooks/utils';
import ContextMenuClickRight from './ContextMenuClickRight';
import CustomModalRoom from './CustomModalRoom';
import ViewDetailRoom from './ViewDetailRoom';


const TypeListMap = (userOnline, selectedUser, data, typeList, name, setSelectedUser, socket, setStatusMessage, setInitialMessages, setNotificationStatus, setIsRoom,setStatusListContact) => {
        
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ xPos: 0, yPos: 0});
  const [selectedItem, setSelectedItem] = useState(null);
  const userRole = tokenUtils.getLoggedInUseRol();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [isModalOpenViewDetailRoom, setIsModalOpenViewDetailRoom] = useState(false);

  const toggleSubMenu = (index) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };



  // Opciones del Menu (Click derecho)
  const options = [
    {label: 'Informacion del Grupo', action: 'View'},
    ...(userRole !== 'estudiante'
      ? [{ label: 'Añadir o eliminar Estudiantes', action: 'Custom' }]
      : [])
  ];

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setMenuPosition({ xPos: e.pageX, yPos: e.pageY })
    setMenuVisible(true);
  }

  const handleMenuAction = (option) => {
    setMenuVisible(false);
    if (option.action === 'View') {
      setIsModalOpenViewDetailRoom(true);
    } else if (option.action === 'Custom') {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const closeModalViewDetailRoom = () => {
    setIsModalOpenViewDetailRoom(false); // Cierra el modal
  };

  useEffect(() =>{
    const hadleClickOutside = () => setMenuVisible(false);
    document.addEventListener('click', hadleClickOutside);
    return () => document.removeEventListener('click', hadleClickOutside);
  }, []);
    

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
    await axios.post('http://localhost:5000/conversation/room/requestRoomId', {
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


  const handleDeleteChat = async(id, name) => {
    try {
      const response = await axios.put(`http://localhost:5000/delete/chat`,
        {
          name,
          id
        },
        {
          headers: {
            authorization: `Bearer ${tokenUtils.getToken()}`
          },
          withCredentials: true
        }
      );
      // Maneja la respuesta si es necesario
      console.log(response.data);
      window.location.reload();
      
    } catch (error) {
      // Maneja el error si la petición falla
      console.error('Error deleting chat:', error);
    }}

   
  

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
      <div>
      {data.map(item => (
        <button
          key={item.id}
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          onClick={() => handleUserClickRoom(item.name)}
          onContextMenu={(e) => handleContextMenu(e, item)}
        >
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2 text-sm font-semibold">{item.name}</div>
          <div className="h-3 w-3 bg-green-500 rounded-full ml-2"></div>
        </button>
      ))}

      {menuVisible && (
        <ContextMenuClickRight
          options={options}
          xPos={menuPosition.xPos}
          yPos={menuPosition.yPos}
          handleMenuAction={handleMenuAction}
        />
      )}
      <CustomModalRoom isOpen={isModalOpen} onClose={closeModal} roomSelected={item.id}/>
      <ViewDetailRoom isOpen={isModalOpenViewDetailRoom} onClose={closeModalViewDetailRoom} />


    </div>
    ))
  }
  if (typeList === "estudiante" || typeList === "docente") {
    return data.map((item, index)=> (

      <div className="relative mb-2" key={item.id}>
        <div className="flex items-center w-full hover:bg-gray-100 rounded-xl p-2 cursor-pointer">
          <div
            className="flex flex-row items-center w-full"
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
                <div className="h-3 w-3 bg-red-500 rounded-full ml-2"></div>
              )
            )}
          </div>

          <button
            className="ml-2 p-1 rounded-full hover:bg-gray-200"
            onClick={() => toggleSubMenu(index)}
          >
            <span className="text-gray-500">⋮</span>
          </button>
        </div>

        {openSubMenuIndex === index && (
          <div onClick ={()=>handleDeleteChat(item.id, name)} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Eliminar</li>
            </ul>
          </div>
        )}
      </div>
    ))
  }
}

export default TypeListMap;