import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import tokenUtils from "../../Hooks/utils";
import HandelSubmitEndpointUsers from '../../Helpers/HandelSubmitEndpointUsers';
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";

const ListContact = ({ name, connected, setSelectedUser,setInitialMessages, socket, setIsRoom}) => { 
  const [data, setData] = useState([]);
  const [typeList, setTypeList]= useState("estudiante")
  const [user, setUser] = useState({});

  useEffect( () => { 
    const apiUrl = 'http://localhost:5000/user/list';
    axios.get(apiUrl, { 
      headers: { authorization: `Bearer ${tokenUtils.getToken()}` } , params: {
        typeList,
      } 
    }).then(response => {
      setData(response.data);
      console.log(response.data)
    });
    setIsRoom("")
     searchUserForName()
    }, []);

  const searchUserForName = async () => {
    const response = await callApisUserEstudents.searchUser(name);
    setUser(response);
  };


  const handleUserClick = (userName) => {
    if (setSelectedUser) { // Verifica que setSelectedUser es una función
      setSelectedUser(userName);
      handleSubmit(name, userName)
    } else {
      console.error('setSelectedUser is not a function');
    }
  };


  const handleUserClickRoom = (nameRoom) => {
    if(setSelectedUser){
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




  const handleSubmit = async(user_one, user_two) => { 

    await axios.post('http://localhost:5000/conversation/create', {
      user_one,
      user_two
    }, { withCredentials: true }).then(response => {
      const roomName = response.data.room; // Asegúrate de obtener el nombre de la sala del servidor
    
    
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
      }
      setIsRoom("")
    });
  }




const mapList = () => {
    if (!Array.isArray(data)) {
      return null;
    }
  
    if(typeList === "room" ){
      return data.map(item => (
        
        <button 
          key={item}
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          onClick={() => handleUserClickRoom(item)}
        >
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
             {item.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2 text-sm font-semibold">{item}</div>
        </button>
      ))
    } else {
      return data.map(item => (
        <button 
          key={item}
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          onClick={() => handleUserClick(item)}
        >
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            {item.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2 text-sm font-semibold">{item}</div>
        </button>
      ))
    }
  }
  





  return (
    <>
      {/* Sidebar */}
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Chat Publico</div>
        </div>
        <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        
        <div className="h-20 w-22 rounded-full border overflow-hidden">
        <img
          src={                
            user.photo && user.photo.url
            ? `http://localhost:5000${user.photo.url}`
            : "URL_de_imagen_por_defecto"}
          alt="Avatar"
          className="h-full w-full"
        />
      </div>

          <div className="text-sm font-semibold mt-2">{name}</div>
          <div className="text-xs text-gray-500">{connected ? 'Active' : 'Inactive'}</div>
        </div>
        <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs space-x-2 flex-wrap">
            <button onClick={() => HandelSubmitEndpointUsers(setData, setTypeList,"estudiante")}  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              Estudiantes
            </button>
            <button onClick={() => HandelSubmitEndpointUsers(setData, setTypeList,"docente")}  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              Docentes
            </button>
            <button onClick={()=>HandelSubmitEndpointUsers(setData,setTypeList,"room")} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              Grupos
            </button>
          </div>

          <div className="flex flex-row items-center justify-between text-xs mt-4">
            <span className="font-bold">Active Conversationss</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
          </div>
          
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {mapList()}
      </div>


    </div>

  </div>
</>
); }

export default ListContact;