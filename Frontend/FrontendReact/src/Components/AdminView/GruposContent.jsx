import React, { useEffect, useState } from "react";
import callApisRooms from "../../Helpers/servicesRooms"; 
import callApisUserEstudents from "../../Helpers/servicesEstudiantes"; 
import callApisUserTeachers from "../../Helpers/servicesDocentes"; 
import CardRooms from "./CardRooms";
import ModalRooms from "./ModalRooms";
import Swal from 'sweetalert2'

const GruposContent = ({ onUserChange }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [estudiantes, setEstudiantes] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentRooms, setCurrentRooms] = useState(null);

  const openModal = () => setIsOpen(true);
  
  const closeModal = () => {
    setIsOpen(false);
    setCurrentRooms(null);
  };

  const fetchRooms = async () => {
    setIsLoading(true);
    const response = await callApisRooms.listarRooms();
    setRooms(response);
    setIsLoading(false);
  };


  const fetchEstudiantes = async () => {
    const response = await callApisUserEstudents.listarEstudiantes();
    setEstudiantes(response);
  };

  const fetchDocentes = async () => {
    const response = await callApisUserTeachers.listarDocentes(); 
    setDocentes(response);
  };

  useEffect(() => {
    fetchRooms();
    fetchEstudiantes();
    fetchDocentes();
  }, []);

  const handleEditar = (room) => {
    setCurrentRooms(room); // Establecer el rooms actual para edición
    openModal();
  };

  const handleEliminar = async (id) => {
    console.log("Eliminar Room con ID:", id);


    Swal.fire({
      title: "¿Estas seguro que quieres eliminarlo?",
      text: "No hay marcha atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        //let result = callApisUserEstudents.eliminarUsuario(id)
        Swal.fire({
          title: "¡Eliminado!",
          text: "Grupo Eliminado.",
          icon: "success"
        });

        if(result){
          setTimeout(() => {
            fetchRooms();
            onUserChange();
          }, 1000); // Espera 2 segundos (2000 milisegundos) antes de ejecutar
        }
      }

      
    });
  };

  const handleSubmit = async (data) => {
    if (currentRooms) {
      // Actualizar estudiante
      //const response = await callApisUserEstudents.editarEstudiante(data, currentEstudiante.id);
      console.log("Actualizar Room:", data);

    } else {
      // Crear nuevo estudiante
      const response = await callApisRooms.guardarRoom(data);
    }
    fetchRooms(); // Volver a cargar la lista de estudiantes
    closeModal();
    onUserChange();
  };

  const handleVerUsuarios = async (data) =>{
    console.log("Aca Visualizamos todos los GRUPOS Y SUS USUARIOS")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Grupos</h1>
        <button
          className="middle none relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg bg-green-500 text-center font-sans text-xs font-medium uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={openModal}
          data-ripple-light="true"
        >
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
            <i
              className="fas fa-plus text-lg leading-none"
              aria-hidden="true"
            ></i>
          </span>
        </button>
      </div>
      <ModalRooms
        isOpen={isOpen}
        onClose={closeModal}
        title={currentRooms ? "Editar Grupo" : "Crear Grupo"}
        onSubmit={handleSubmit}
        room={currentRooms} // Pasar el grupo actual si existe
        usuariosEstudiantes={estudiantes}
        usuariosDocentes={docentes}
      />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <CardRooms
              key={room.id}
              nombre={room.name}
              foto={
                room.photo && room.photo.url
                  ? `http://localhost:5000${room.photo.url}`
                  : "URL_de_imagen_por_defecto"
              }
              onEditar={() => handleEditar(room)}
              onEliminar={() => handleEliminar(room.id)}
              onVerUsuarios={() => handleVerUsuarios(room.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GruposContent;
