import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HandleDowloadFile from '../../Helpers/HandleDowloadFile';

const Chat = ({setFiles, setFileName, fileName, sendMessage, allMessages, connected, setMessage, message,name, nameNew}) => {
    

    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [fileTabVisible, setFileTabVisible] = useState(false); 
    

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
        
      };
    
     
      const handleFileSubmit = () => {
        console.log("Archivo subido");
        console.log(file);
        setFiles(file);
        setShowModal(false)
        setFileTabVisible(true); // Mostrar la pestaña cuando se carga un archivo
      };
    
      const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage();
        setFile(null); // Limpiar el archivo al enviar el mensaje
        setFileTabVisible(false); // Ocultar la pestaña
      };

  return (
    <>
      <div className="flex flex-col flex-auto h-full p-6 bg-white">
        <div className="flex items-center justify-between h-12 bg-indigo-500 text-white rounded-t-xl p-4">
          <h2 className="text-lg font-semibold">{nameNew}</h2>
        </div>

        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col-reverse">
              {connected ? (
                <div className="flex flex-col p-3">
                  {allMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === name ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                      <div className={`flex items-center ${msg.sender.name === name ? 'flex-row-reverse' : ''}`}>

                        <div
                          className={`relative ${msg.sender.name === name ? 'mr-3' : 'ml-3'} text-sm ${msg.sender.name === name
                            ? 'bg-blue-400 text-white'
                            : 'bg-white text-gray-800'
                            } py-2 px-4 shadow rounded-xl max-w-xs`}
                        >
                          <div>
                            {msg.content != "" ? msg.content : ""}
                            {msg.file.file_id !== "" && (
                              <button onClick={()=>HandleDowloadFile(msg.file.file_id,msg.file.filename)} className="mt-2 p-2 bg-blue-50 text-blue-700 font-semibold border border-blue-300 rounded-md shadow-sm">{msg.file.filename}</button>
                              )}
                          </div>
                          <div className="text-xs text-gray-500 text-right">{msg.timestamp}</div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-md">
          <div className="relative w-full">
                {/* Pestaña desplegable para el archivo */}
                {fileTabVisible && (
                  <div className="absolute -top-8 left-4 bg-gray-200 text-gray-700 rounded-md px-2 py-1 transition-all duration-300 transform">
                    {fileName}
                  </div>
                )}

            <div className="flex-grow ml-4">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:bg-fuchsia-200 pl-4 h-10"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="ml-4">
              <button
                onClick={() => setShowModal(true)} // Abre el modal
                className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Adjuntar</span>
              </button>
            </div>

            <div className="ml-4">
              <button
                onClick={handleSendMessage} // Cambiar a la función de envío de mensajes
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para seleccionar archivos */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4">Selecciona un archivo</h3>
            <input
              type="file"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)} // Cierra el modal
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleFileSubmit}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-2"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat