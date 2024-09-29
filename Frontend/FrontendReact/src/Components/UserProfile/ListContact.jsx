import React, { useEffect, useState } from 'react';
import HandelSubmitEndpointUsers from '../../Helpers/HandelSubmitEndpointUsers';
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";
import TypeListMap from './TypeListMap';
import Swal from 'sweetalert2'
import addContact from '../../Helpers/addContact';
import existContact from '../../Helpers/existContact'


const ListContact = ({ handleLogout,selectedUser,name, connected, setSelectedUser,setInitialMessages, socket, setIsRoom, statusListContact, setStatusListContact }) => { 
  const [data, setData] = useState([]);
  const [statusMessage, setStatusMessage] = useState()
  const [typeList, setTypeList] = useState("estudiante")
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [statusUser, setStatusUser] = useState(false)

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeList == "estudiante") {
      HandelSubmitEndpointUsers(setData, setTypeList, "estudiante", name)

    }
    
    if (typeList == "room") {
      HandelSubmitEndpointUsers(setData, setTypeList, "room", name)

    }


    if (typeList == "docente") {
      HandelSubmitEndpointUsers(setData, setTypeList, "docente", name)

    }
    if (notificationStatus == true) {
      HandelSubmitEndpointUsers(setData, setTypeList, "estudiante", name)

      setNotificationStatus(false)
      if (typeList == "docente") {
        HandelSubmitEndpointUsers(setData, setTypeList, "docente", name)

      }

    }
    if (statusListContact == true) {

      return () => {
        setStatusListContact(false)

        // socket.off('new_message');

      };
    }
    setIsRoom("")
    searchUserForName()
    newMessage()


  }, [statusListContact, typeList, notificationStatus]);

  const newMessage = () => {
    socket.on('new_message', (m) => {
      // Cuando se reciba un nuevo mensaje, actualiza el contador de notificaciones
      setNotificationStatus(m.newMessage);

      if(m.Received == name ){
        existContact(name,m.SenderId).then(res =>{
          if(res==true){
            Swal.fire({
              title: m.Sender,
              text: "Este usuario se esta comunicando contigo, deseas agregarlo!",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Agregar" 
            }).then((result) => {
              if (result.isConfirmed) {
                addContact(name,m.SenderId, setStatusListContact)
              }
            
            })
          }
        })
    }
    });
  }

  const searchUserForName = async () => {
    const response = await callApisUserEstudents.searchUser(name);
    setUser(response)

    var res = response.status == 1 ? true : false;
    setStatusUser(res)
  };


  return (

    <>
      {/* Sidebar */}
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white shadow-lg rounded-lg">
    <div className="flex flex-row items-center justify-center h-12 w-full mb-4">
        <div className="flex items-center justify-center rounded-full text-indigo-700 bg-indigo-100 h-10 w-10 shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
        </div>
        <div className="ml-2 font-bold text-xl text-gray-800">Chat</div>
    </div>
    
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg shadow-sm">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img src={user ? `http://localhost:5000${user.photo.url}` : "URL_de_imagen_por_defecto"} alt="Avatar" className="h-full w-full object-cover" />
        </div>
        <div className="text-sm font-semibold mt-2 text-gray-700">{name}</div>
        <div className="text-xs text-gray-500">{statusUser ? 'Activo' : 'Inactivo'}</div>
    </div>
    
    <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs space-x-2 flex-wrap">
            <button onClick={() => HandelSubmitEndpointUsers(setData, setTypeList, "estudiante", name)} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                Estudiantes
            </button>
            <button onClick={() => HandelSubmitEndpointUsers(setData, setTypeList, "docente", name)} className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                Docentes
            </button>
            <button onClick={() => HandelSubmitEndpointUsers(setData, setTypeList, "room", name)} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                Grupos
            </button>
        </div>

        <div className="flex flex-row items-center justify-between text-xs mt-4">
            <span className="font-bold text-gray-700">Conversaciones Activas</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
        </div>

        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {TypeListMap(selectedUser,data, typeList, name, setSelectedUser, socket, setStatusMessage, setInitialMessages, setNotificationStatus, setIsRoom)}
        </div>
    </div>
    <div className="mt-auto">
        <button 
            onClick={handleLogout} 
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg mt-6 hover:bg-red-600 transition-colors duration-300"
        >
            Salir
        </button>
    </div>
</div>


</>
); }

export default ListContact;