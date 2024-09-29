import React, { useEffect, useState } from "react";
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";
import callApisUserTeachers from "../../Helpers/servicesDocentes";

const ViewDetailRoom = ({ isOpen, onClose }) => {
//   const [estudiantes, setEstudiantes] = useState([]);
//   const [groupState, setGroupState] = useState({}); // Estado para gestionar la participación en el grupo

  // Hook para obtener estudiantes al abrir el modal
//   useEffect(() => {
//     const fetchEstudiantes = async () => {
//       const response = await callApisUserEstudents.listarEstudiantes();
//       const groupStateInitial = {};

//       // Inicializamos el estado del grupo basado en si están participando en el grupo o no
//       response.forEach((estudiante) => {
//         groupStateInitial[estudiante.id] = estudiante.groupParticipating.includes(roomSelected);
//       });

//       setEstudiantes(response);
//       setGroupState(groupStateInitial);
//     };

//     fetchEstudiantes();
//   }, [isOpen]);

  if (!isOpen) return null;



  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 z-50 overflow-hidden">
    {/* Sidebar Overlay */}
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>


    <section className="absolute inset-y-0 right-0 max-w-full flex">
      <div className="w-screen max-w-md">
        <div className="h-full flex flex-col py-6 bg-white shadow-xl">





          {/* Header */}
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold text-black">Detalles de la Sala</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Room Details Content */}
          <div className="mt-4 px-4">
            <h3 className="text-lg font-semibold">ffff</h3>
            <p className="text-gray-600">dddd</p>
            {/* Agrega más detalles si es necesario */}
          </div>





          <div className="mt-6 px-4">
            <button className="bg-black text-white rounded-md px-4 py-2" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </section>




  </div>
  );
};

export default ViewDetailRoom;
