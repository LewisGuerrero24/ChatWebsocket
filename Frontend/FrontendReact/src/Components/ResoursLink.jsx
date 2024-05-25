import React from "react";
import { Link } from 'react-router-dom';

const ResourcesLink = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <div className="p-1 bg-blue-200"></div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Usuario Registrado</h2>
            <p className="text-4xl font-bold text-gray-800 mb-2">La mejor</p>
            <p className="text-4xl font-bold text-gray-800 mb-6">experiencia!</p>
            <ul className="text-sm text-gray-600 mb-6">
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Tendrás los chats de tus clases
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Comunicación con usuarios
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Habla con los profesores
              </li>
            </ul>
          </div>
          <div className="p-4">
            <Link to={'login'}>
              <button className="w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Acceder
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <div className="p-1 bg-green-200"></div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Invitados</h2>
            <p className="text-4xl font-bold text-gray-800 mb-2">Participación</p>
            <p className="text-4xl font-bold text-gray-800 mb-6">Pública!</p>
            <ul className="text-sm text-gray-600 mb-6">
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Acceso a salas públicas
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Accede con pseudónimo
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Participa sin restricción
              </li>
            </ul>
          </div>
          <div className="p-4">
            <Link to={'TemporalLogin'}>
              <button className="w-full bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                Acceder
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLink;
