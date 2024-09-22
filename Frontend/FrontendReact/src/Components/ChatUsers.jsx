import React, { useEffect, useState } from 'react';
import MessageSocketIoUsers from '../Hooks/MessageSocketIoUsers';
import { useNavigate } from 'react-router-dom';
import handleGoOut from '../Helpers/handleGoOut';

const ChatUsers = ({ name, nameSendUser, connected, socket, initialMessages}) => {
  const { message, setMessage, showMessage, sendMessage,setShowMessage} = MessageSocketIoUsers({ socket }, nameSendUser, name);


  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState([]);
  const [nameNew, setNameNew ]= useState("Nick")

  const handleGoOutCallback = () => {
    handleGoOut(name, navigate);
  };

  useEffect(() => {
    if(nameSendUser){
      if(nameSendUser !== nameNew){
        setNameNew(nameSendUser)
        setShowMessage([])
      }
        setAllMessages([...initialMessages, ...showMessage]);
    }
  }, [initialMessages, showMessage, nameSendUser]);


  return (
    <>
      {/* Main Chat Section */}
      <div className="flex flex-col flex-auto h-full p-6">
        {/* Barra superior */}
        <div className="flex items-center justify-between h-12 bg-indigo-500 text-white rounded-t-xl p-4">
          <h2 className="text-lg font-semibold">{nameNew}</h2>
        </div>
  
        {/* Resto del diseño */}
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="grid grid-cols-12 gap-y-2">
              {/* Render messages here */}
              {connected ? (
                <div className="flex flex-col p-3">
                  {allMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === name ? 'justify-end' : 'justify-start'
                      } mb-2`}
                    >
                      <div
                        className={`flex items-center ${
                          msg.sender.name === name ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-stone-400 flex-shrink-0">
                          {msg.sender.name.charAt(0)}
                        </div> */}
                        <div
                          className={`relative ${
                            msg.sender.name === name ? 'mr-3' : 'ml-3'
                          } text-sm ${
                            msg.sender.name === name ? 'bg-blue-400' : 'bg-white'
                          } py-2 px-4 shadow rounded-xl`}
                        >
                          <div>{msg.content}</div>
                          <div className="text-xs text-gray-500 text-right">
                            {msg.timestamp}
                          </div>
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
  
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
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
                onClick={sendMessage}
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
            <div className="ml-4">
              <button onClick={handleGoOutCallback}>Salir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default ChatUsers;
