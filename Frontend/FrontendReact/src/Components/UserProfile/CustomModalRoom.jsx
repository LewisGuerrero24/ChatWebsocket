import React, { useEffect, useState } from "react";
import callApisUserEstudents from "../../Helpers/servicesEstudiantes";
import { toast } from "react-hot-toast"; 

const CustomModalRoom = ({ isOpen, onClose, roomSelected }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [groupState, setGroupState] = useState({}); // Estado para gestionar la participación en el grupo

  // Hook para obtener estudiantes al abrir el modal
  useEffect(() => {
    const fetchEstudiantes = async () => {
      const response = await callApisUserEstudents.listarEstudiantes();
      const groupStateInitial = {};

      // Inicializamos el estado del grupo basado en si están participando en el grupo o no
      response.forEach((estudiante) => {
        groupStateInitial[estudiante.id] = estudiante.groupParticipating.includes(roomSelected);
      });

      setEstudiantes(response);
      setGroupState(groupStateInitial);
    };

    fetchEstudiantes();
  }, [isOpen]);

  if (!isOpen) return null;

  // Función para añadir al grupo
  const handleAddToGroup = async (estudianteId) => {
    const response = await callApisUserEstudents.editRoomAndUsers(roomSelected, estudianteId, "addGrupo")
    toast.success('Estudiante Añadido al Grupo', {
      position: "bottom-right",
      style: {
        background: "green",  
        color: "#fff",       
      },
    });
  };

  // Función para remover del grupo
  const handleRemoveFromGroup = async (estudianteId) => {
    const response = await callApisUserEstudents.editRoomAndUsers(roomSelected, estudianteId, "remGrupo")
    toast.success('Estudiante Removido del Grupo', {
      position: "bottom-right",
      style: {
        background: "green",  
        color: "#fff",       
      },
    });
  };

  // Función para alternar la participación de un estudiante en el grupo
  const toggleGroupParticipation = async (estudianteId) => {
    const isInGroup = groupState[estudianteId];

    if (isInGroup) {
      await handleRemoveFromGroup(estudianteId);
    } else {
      await handleAddToGroup(estudianteId);
    }

    // Actualizamos el estado localmente para reflejar el cambio en la UI
    setGroupState((prevState) => ({
      ...prevState,
      [estudianteId]: !isInGroup, // Cambiamos el estado de participación
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col divide-y max-h-[400px] overflow-y-auto">
          {estudiantes.map((estudiante) => (
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
              <button
                onClick={() => toggleGroupParticipation(estudiante.id)} // Alternar participación al hacer clic
                className={`border rounded-md px-4 py-2 text-sm text-white transition ${
                  groupState[estudiante.id]
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {groupState[estudiante.id] ? "Remover del Grupo" : "Añadir al Grupo"}
              </button>
            </div>
          ))}
        </div>
        <div className="p-4">
          <button
            onClick={onClose}
            className="w-full border rounded-md p-2 text-sm hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModalRoom;
