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


  if(nameNew == "Nick"){
    return (<div class='flex flex-col flex-auto h-full p-6 bg-gradient-to-r from-blue-500 to-indigo-500'>
      <div class="flex justify-center items-center min-h-screen">
    <div class="max-w-[720px] mx-auto">
        <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
            <a 
                target="_blank" 
                href="https://www.material-tailwind.com/docs/html/card" 
                class="block w-full px-4 py-2 text-center text-slate-700 transition-all"
            >
                More components on <b>Material Tailwind</b>.
            </a>
        </div>

     
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="p-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-12 h-12 mb-4 text-gray-900">
                    <path fill-rule="evenodd"
                        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                        clip-rule="evenodd"></path>
                    <path
                        d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z">
                    </path>
                </svg>
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    UI/UX Review Check
                </h5>
                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Because it's about motivating the doers. Because I'm here to follow my dreams and inspire others.
                </p>
            </div>
            <div class="p-6 pt-0">
                <a href="#" class="inline-block">
                    <button
                        class="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                        type="button">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                        </svg>
                    </button>
                </a>
            </div>
        </div>
    </div>
</div>
  </div>)
  }



  return (
    <>

  {/* Main Chat Section */}
  <div className="flex flex-col flex-auto h-full p-6 bg-white">

    


    {/* Barra superior */}
    <div className="flex items-center justify-between h-12 bg-indigo-500 text-white rounded-t-xl p-4">
      <h2 className="text-lg font-semibold">{nameNew}</h2>
    </div>

    {/* Resto del diseño */}
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col-reverse">
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
                    <div
                      className={`relative ${
                        msg.sender.name === name ? 'mr-3' : 'ml-3'
                      } text-sm ${
                        msg.sender.name === name
                          ? 'bg-blue-400 text-white'
                          : 'bg-white text-gray-800'
                      } py-2 px-4 shadow rounded-xl max-w-xs`}
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

      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-md">
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
          <button onClick={handleGoOutCallback} className="text-indigo-500">
            Salir
          </button>
        </div>
      </div>
    </div>
  </div>
</>

  );
  
};

export default ChatUsers;
