import React, { useEffect, useState } from 'react'

let  id = 0
const MessageSocketIo = ({socket}, name) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message',{name: name, message: message});
        setMessage(''); 
      };
    
      const handleMessage = (m) => {
        console.log(m);
          setShowMessage((prevMessages) => [...prevMessages, { id: id++,name: m.name ,message: m.message }]);
          console.log(showMessage)
      };

    useEffect(() => {
        socket.on('message', handleMessage);
        return () => {
          socket.off('message',handleMessage);
        };
      }, []);
    
  return {
    message,
    setMessage,
    showMessage,
    handleSubmit
  }
}

export default MessageSocketIo
