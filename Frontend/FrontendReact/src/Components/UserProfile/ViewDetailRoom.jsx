import React, { useEffect, useState } from "react";
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";
import callApisUserTeachers from "../../Helpers/servicesDocentes";

const ViewDetailRoom = ({ isOpen, onClose, thisRoom }) => {
   const [estudiantes, setEstudiantes] = useState([]);
   const [docentes, setDocentes] = useState([]);

   const [estudiantesParticipando, setEstudiantesParticipando] = useState([]);
   const [docentesParticipando, setdocentesParticipando] = useState([]);


   useEffect(() =>{
        const fetchData = async () => {
          try {
              const responseEstudiantes = await callApisUserEstudents.listarEstudiantes();
              const responseDocentes = await callApisUserTeachers.listarDocentes();

              setDocentes(responseDocentes)
              setEstudiantes(responseEstudiantes)
          } catch (error) {
              console.error("Error al obtener los datos:", error);
          }
      };
      fetchData();
  }, [isOpen]);


  useEffect(() => {
    const verificarIntegrantesDeLaSala = async () => {
      let estudianteParticipando = estudiantes.filter(estudiante =>
        Array.isArray(estudiante.groupParticipating) &&
        estudiante.groupParticipating.some(groupId => groupId.toString() === thisRoom.id.toString())
      );
      setEstudiantesParticipando(estudianteParticipando)
  
      let docenteParticipando = docentes.filter(docente =>
        Array.isArray(docente.groupParticipating) &&
        docente.groupParticipating.some(groupId => groupId.toString() === thisRoom.id.toString())
      );
      setdocentesParticipando(docenteParticipando)
      
    }
  
    verificarIntegrantesDeLaSala();
  }, [estudiantes, docentes, thisRoom.id]);





   if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 z-50 overflow-hidden">
      {/* Sidebar Overlay */}
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75" onClick={onClose}></div>
      <section className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col py-6 bg-white shadow-xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

                <div aria-label="header" className="flex space-x-4 items-center p-4">
                  <div aria-label="avatar" className="flex mr-auto items-center space-x-4">
                    <img
                      src={thisRoom.photo && thisRoom.photo.url
                        ? `http://localhost:5000${thisRoom.photo.url}`
                        : "URL_de_imagen_por_defecto"}

                      alt="avatar Evan You"
                      className="w-[173px] h-[155px] shrink-0 rounded-full"
                    />
                    <div className="space-y-2 flex flex-col flex-1">
                      <div className="font-bold text-2xl leading-tight text-gray-900"> {/* Cambiado a 'font-bold' y 'text-2xl' */}
                        <span className="flex">
                          <span className="relative pr-8">
                            {thisRoom.name}
                            <span
                              aria-label="verified"
                              className="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                            >
                            </span>
                          </span>
                        </span>
                      </div>
                      <p className="font-normal text-base leading-tight text-gray-500">
                        {thisRoom.description}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-t border-gray-200 my-2 w-3/4 mx-auto" />


                <div aria-label="navigation" className="py-2">
                  <nav className="grid gap-1">
                    <a href="/" className="flex items-center space-x-3 py-3 px-4 text-lg text-gray-600 hover:bg-gray-100 rounded-md">
                      <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                      </svg>
                      <span>Docentes</span>
                    </a>
                  </nav>

                  <div className="flex flex-col divide-y max-h-[400px] overflow-y-auto">
                    {docentesParticipando.map((docente) => (
                      <div key={docente.id} className="flex justify-between items-center p-6 space-x-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              docente.photo && docente.photo.url
                                ? `http://localhost:5000${docente.photo.url}`
                                : "URL_de_imagen_por_defecto"
                            }
                            className="rounded-full h-14 w-14"
                            alt={docente.name}
                          />
                          <div className="flex flex-col space-y-1">
                            <span className="font-semibold">{docente.name}</span>
                            <span className="text-gray-500 text-sm">{docente.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>









                <div aria-label="navigation" className="py-2 mt-6">
                  <nav className="grid gap-1">
                    <a href="/" className="flex items-center space-x-3 py-3 px-4 text-lg text-gray-600 hover:bg-gray-100 rounded-md">
                      <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                      </svg>
                      <span>Estudiantes</span>
                    </a>
                  </nav>

                  <div className="flex flex-col divide-y max-h-[400px] overflow-y-auto">
                    {estudiantesParticipando.map((estudiante) => (
                      <div key={estudiante.id} className="flex justify-between items-center p-6 space-x-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              estudiante.photo && estudiante.photo.url
                                ? `http://localhost:5000${estudiante.photo.url}`
                                : "URL_de_imagen_por_defecto"
                            }
                            className="rounded-full h-14 w-14"
                            alt={estudiante.name}
                          />
                          <div className="flex flex-col space-y-1">
                            <span className="font-semibold">{estudiante.name}</span>
                            <span className="text-gray-500 text-sm">{estudiante.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewDetailRoom;
