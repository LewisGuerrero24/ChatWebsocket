import React, { useEffect, useState } from "react";
import listarEstudiantes from "../../Helpers/servicesEstudiantes";
import CardUsuarios from "./CardUsuarios";

const EstudiantesContent = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            const response = await listarEstudiantes();
            setEstudiantes(response);
            setIsLoading(false);
            console.log(response);
        };
        fetchEstudiantes();
    }, []);

    const handleEditar = (id) => {
        console.log("Editar estudiante con ID:", id);
    };

    const handleEliminar = (id) => {
        console.log("Eliminar estudiante con ID:", id);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Estudiantes</h1>
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
                            foto={estudiante.photo && estudiante.photo.url ? `http://localhost:5000${estudiante.photo.url}` : "URL_de_imagen_por_defecto"}
                            onEditar={() => handleEditar(estudiante.id)}
                            onEliminar={() => handleEliminar(estudiante.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EstudiantesContent;