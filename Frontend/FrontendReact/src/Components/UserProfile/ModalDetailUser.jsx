import React, { useEffect, useState } from "react";
import tokenUtils from "../../Hooks/utils";
import axios from 'axios';

const ModalDetailUser = ({ isOpen, onClose, user }) => {
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        const getUser = async (name) => {
            if (!name) return; // Si no hay nombre, no hagas la solicitud
            try {
                const response = await axios.get(`http://localhost:5000/api/search-for-name`, {
                    params: {
                        name: name
                    },
                    headers: {
                        authorization: `Bearer ${tokenUtils.getToken()}`
                    },
                    withCredentials: true
                });
                setUsuario(response.data); // Ajustar aquí para recibir los datos correctamente
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (isOpen && user?.name) {
            getUser(user.name); // Solo buscar el usuario si el modal está abierto y hay un nombre
        }

        return () => {
            setUsuario({}); // Limpia el estado del usuario al cerrar o desmontar el modal
        };
    }, [isOpen, user]);

    const handleCloseModal = () => {
        setUsuario({});
        onClose();      
    };

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center min-h-screen fixed inset-0 z-50 overflow-hidden">
            {/* Sidebar Overlay */}
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75" onClick={handleCloseModal}></div>
            <section className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl w-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4">
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div aria-label="header" className="flex space-x-4 items-center p-4">
                            <div aria-label="avatar" className="flex mr-auto items-center space-x-4">
                                <img
                                    src={usuario.photo && usuario.photo.url
                                        ? `http://localhost:5000${usuario.photo.url}`
                                        : "URL_de_imagen_por_defecto"}
                                    alt="avatar"
                                    className="w-[173px] h-[155px] shrink-0 rounded-full"
                                />
                                <div className="space-y-2 flex flex-col flex-1">
                                    <div className="font-bold text-2xl leading-tight text-gray-900">
                                        <span className="flex">
                                            <span className="relative pr-8">
                                                {usuario.name}
                                                <span aria-label="verified" className="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"></span>
                                            </span>
                                        </span>
                                    </div>
                                    <p className="font-normal text-base leading-tight text-gray-500">
                                        {usuario.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-2 w-3/4 mx-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ModalDetailUser;
