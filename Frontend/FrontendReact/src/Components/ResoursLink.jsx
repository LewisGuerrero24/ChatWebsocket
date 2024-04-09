import React from "react";
import { Link } from 'react-router-dom';


const resoursLink = () => {
  return (
    // <div className="bg-red-400">
    //   <ul>
    //     <li>
    //       <Link to={'Login'}>Login</Link>
    //     </li>
    //     <li>
    //         <Link to={'Register'}>Register</Link>
    //     </li>
    //     <li>
    //         <Link to={'temporallogin'}>Temporal Chat</Link>
    //     </li>
    //   </ul>
    //   <hr />
    // </div>
    <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

    {/* <!-- Pricing Card 1 --> */}
    <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div class="p-1 bg-blue-200">
      </div>
      <div class="p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Usuario Registrado</h2>
        <p class="text-4xl font-bold text-gray-800 mb-2">La mejor</p>
        <p class="text-4xl font-bold text-gray-800 mb-6">experiencia!</p>
        <ul class="text-sm text-gray-600 mb-6">
          <li class="mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Tendras los chats de tus clases
          </li>
          <li class="mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Comunicacion con usuarios
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Habla con los profesores
          </li>
        </ul>
      </div>
      <div class="p-4">
        <Link to={'login'}>
        <button
          class="w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Acceder
        </button>
        </Link>
      </div>
    </div>

    {/* <!-- Pricing Card 2 --> */}
    <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div class="p-1 bg-green-200">
      </div>
      <div class="p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Invitados</h2>
        <p class="text-4xl font-bold text-gray-800 mb-2">Participacion</p>
        <p class="text-4xl font-bold text-gray-800 mb-6">Publica!</p>
        <ul class="text-sm text-gray-600 mb-6">
          <li class="mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Acceso a salas publicas
          </li>
          <li class="mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Accede con pseudonimo
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            Participa sin Restriccion
          </li>
        </ul>
      </div>
      <div class="p-4">
        <Link to={'TemporalLogin'}>
        <button
          class="w-full bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Acceder
        </button>
        </Link>      
      </div>
    </div>

  </div>
</div>
  );
};

export default resoursLink;
