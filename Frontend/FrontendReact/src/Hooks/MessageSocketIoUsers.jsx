import { useEffect, useState } from 'react'

let  id = 0
const MessageSocketIoUsers = ({socket}, nameSend,name, nameRoom) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message_user',{user_primary: name, user_second:nameSend});
        setMessage(''); 
      };
    
      const receivedMessage = (m) => {
        console.log(m);
          setShowMessage((prevMessages) => [...prevMessages, { id:"hola",name:"hola" ,message: "pedro" }]);
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

export default MessageSocketIoUsers
