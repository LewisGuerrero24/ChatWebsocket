import { useEffect, useState } from 'react'

let  id = 0
const MessageSocketIo = ({socket}, name, nameRoom) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message',{name: name, message: message, room: nameRoom});
        setMessage(''); 
      };
    
      const receivedMessage = (m) => {
        console.log(m);
          setShowMessage((prevMessages) => [...prevMessages, { id: id++,name: m.name ,message: m.message }]);
          console.log(showMessage)
      };  

    useEffect(() => {
        socket.on('message', receivedMessage);
        return () => {
          socket.off('message',receivedMessage);
        };
      }, []);
    
  return {
    message,
    setMessage,
    showMessage,
    sendMessage
  }
}

export default MessageSocketIo
