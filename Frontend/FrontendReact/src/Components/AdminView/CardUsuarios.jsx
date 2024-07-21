import React from "react";

const CardUsuarios = ({ nombre, foto, onEditar, onEliminar }) => {
  return (
    <div className="bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center rounded-md hover:bg-gray-900/80 hover:smooth-hover transition-transform transform hover:scale-105">
      <img
        className="w-20 h-20 object-cover object-center rounded-full"
        src={foto}
        alt={nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "URL_de_imagen_por_defecto";
        }}
      />
      <h4 className="text-white text-2xl font-bold capitalize text-center">
        {nombre}
      </h4>
      <div className="flex space-x-2">
        <button
          onClick={onEditar}
          className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true">
          Editar
        </button>
        <button
          onClick={onEliminar}
          className="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardUsuarios;