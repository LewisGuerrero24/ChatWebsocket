import React, { useEffect, useState } from 'react';
import MessageSocketIoUsers from '../Hooks/MessageSocketIoUsers';
import { useNavigate } from 'react-router-dom';
import handleGoOut from '../Helpers/handleGoOut';
import Chat from './UserProfile/Chat';

const ChatUsers = ({ name, nameSendUser, connected, socket, initialMessages }) => {
  const { message, setMessage, showMessage, sendMessage, setShowMessage, setFiles, fileName, setFileName } = MessageSocketIoUsers({ socket }, nameSendUser, name);

  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState([]);
  const [nameNew, setNameNew] = useState("Nick");


  const handleGoOutCallback = () => {
    handleGoOut(name, navigate);
  };

  useEffect(() => {
    if (nameSendUser) {
      if (nameSendUser !== nameNew) {
        setNameNew(nameSendUser);
        setShowMessage([]);
      }
      setAllMessages([...initialMessages, ...showMessage]);
    }
  }, [initialMessages, showMessage, nameSendUser]);

 

  if (nameNew === "Nick") {
    return (
      <div className='flex flex-col h-screen w-full p-6 bg-gradient-to-r from-blue-500 to-indigo-500'>
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex justify-center items-center w-full">
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-w-[720px]">
              <div className="p-6">
                {/* Contenido de bienvenida o presentación */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Chat 
    setFileName={setFileName}  
    setMessage={setMessage} 
    setFiles={setFiles} 
    allMessages={allMessages} 
    sendMessage={sendMessage} 
    connected={connected}
    message={message}
    name={name}
    fileName={fileName}
    nameNew={nameNew}>
    </Chat>
  );
};

export default ChatUsers;
