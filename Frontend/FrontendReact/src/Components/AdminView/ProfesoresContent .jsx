import React, { useEffect, useState } from "react";
import callApisUserTeachers from "../../Helpers/servicesDocentes";
import CardUsuarios from "./CardUsuarios";
import Modal from "./Modal";
import Swal from 'sweetalert2'

const ProfesoresContent = ({ onUserChange }) => {
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDocente, setCurrentDocente] = useState(null);

  const openModal = () => setIsOpen(true);
  
  const closeModal = () => {
    setIsOpen(false);
    setCurrentDocente(null);
  };

  const fetchDocentes = async () => {
    setIsLoading(true);
    const response = await callApisUserTeachers.listarDocentes();
    setDocentes(response);
    console.log("dataaa: ", response)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocentes();
  }, [], );

  const handleEditar = (docente) => {
    setCurrentDocente(docente); // Establecer el docente actual para edición
    openModal();
  };

  const handleEliminar = async (id) => {
    console.log("Eliminar docente con ID:", id);


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
        let result = callApisUserTeachers.eliminarUsuario(id)
        Swal.fire({
          title: "¡Eliminado!",
          text: "Registro Eliminado.",
          icon: "success"
        });

        if(result){
          setTimeout(() => {
            fetchDocentes();
            onUserChange();
          }, 1000); // Espera 2 segundos (2000 milisegundos) antes de ejecutar
        }
      }

      
    });
  };

  const handleSubmit = async (data) => {
    if (currentDocente) {
      // Actualizar docente
      const response = await callApisUserTeachers.editarDocente(data, currentDocente.id);
      console.log("Actualizar docente:", data);

    } else {
      // Crear nuevo docente
      const response = await callApisUserTeachers.guardarDocente(data);
      console.log("Crear nuevo docente:", data);
    }
    fetchDocentes(); // Volver a cargar la lista de docente
    closeModal();
    onUserChange();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Docentes</h1>
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
        title={currentDocente ? "Editar Docente" : "Crear Docente"}
        onSubmit={handleSubmit}
        usuario={currentDocente} // Pasar el docente actual si existe
      />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {docentes.map((docente) => (
            <CardUsuarios
              key={docente.id}
              nombre={docente.name}
              foto={
                docente.photo && docente.photo.url
                  ? `http://localhost:5000${docente.photo.url}`
                  : "URL_de_imagen_por_defecto"
              }
              onEditar={() => handleEditar(docente)}
              onEliminar={() => handleEliminar(docente.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfesoresContent;
