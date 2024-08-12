import React, { useEffect, useState } from "react";
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";
import CardUsuarios from "./CardUsuarios";
import Modal from "./Modal";
import Swal from 'sweetalert2'

const EstudiantesContent = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentEstudiante, setCurrentEstudiante] = useState(null);

  const openModal = () => setIsOpen(true);
  
  const closeModal = () => {
    setIsOpen(false);
    setCurrentEstudiante(null);
  };

  const fetchEstudiantes = async () => {
    setIsLoading(true);
    const response = await callApisUserEstudents.listarEstudiantes();
    setEstudiantes(response);
    console.log("dataaa: ", response)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, [], );

  const handleEditar = (estudiante) => {
    setCurrentEstudiante(estudiante); // Establecer el estudiante actual para edición
    openModal();
  };

  const handleEliminar = async (id) => {
    console.log("Eliminar estudiante con ID:", id);


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
        let result = callApisUserEstudents.eliminarUsuario(id)
        Swal.fire({
          title: "¡Eliminado!",
          text: "Registro Eliminado.",
          icon: "success"
        });

        if(result){
          setTimeout(() => {
            fetchEstudiantes();
          }, 1000); // Espera 2 segundos (2000 milisegundos) antes de ejecutar
        }
      }

      
    });
  };

  const handleSubmit = async (data) => {
    if (currentEstudiante) {
      // Actualizar estudiante
      const response = await callApisUserEstudents.editarEstudiante(data, currentEstudiante.id);
      console.log("Actualizar estudiante:", data);

    } else {
      // Crear nuevo estudiante
      const response = await callApisUserEstudents.guardarEstudiante(data);
      console.log("Crear nuevo estudiante:", data);
    }
    fetchEstudiantes(); // Volver a cargar la lista de estudiantes
    closeModal();
    
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Estudiantes</h1>
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
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={currentEstudiante ? "Editar Estudiante" : "Crear Estudiante"}
        onSubmit={handleSubmit}
        usuario={currentEstudiante} // Pasar el estudiante actual si existe
      />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {estudiantes.map((estudiante) => (
            <CardUsuarios
              key={estudiante.id}
              nombre={estudiante.name}
              foto={
                estudiante.photo && estudiante.photo.url
                  ? `http://localhost:5000${estudiante.photo.url}`
                  : "URL_de_imagen_por_defecto"
              }
              onEditar={() => handleEditar(estudiante)}
              onEliminar={() => handleEliminar(estudiante.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EstudiantesContent;
