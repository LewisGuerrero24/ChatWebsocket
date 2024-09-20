import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import useConnect from "../../Hooks/useConnect";
import axios from "axios";
import addContact from "../../Helpers/addContact";

const BuscadorUsuarios = ({name,setStatusListContact}) => {
  const {socket} = useConnect()
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    socket.on('search_results', (data) => {
      setResults(data); 

      if(results == []){
        setQuery('')
      }
      
    });
    queryChart()

    return () => {
      socket.off('search_results');
      
    };
  }, [query]);


  function queryChart(){
     if (query) {
      socket.emit('search', query); 
    } else {
      setResults([]);
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-xl">
      <div className="flex items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md">
        <svg className="mr-2 h-5 w-5 stroke-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Buscar usuarios..."
          aria-label="Buscar usuarios"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Mostrar resultados debajo del input */}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full max-w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
          {results.map((user, index) => (
            
            (user.name != name && user.suspendedAccount != 0) && (
              
              <li 
                onClick={() => addContact(name, user.id, setStatusListContact)}
                key={index} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
                style={{
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  maxWidth: '100%' 
                }}
              >
                {user.name}
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscadorUsuarios;