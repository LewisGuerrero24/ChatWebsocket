import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';



const ConnectSocketIo = () => {

    const [socket, setSocket] = useState(io('http://localhost:5000'))
        const [connected, setConnected] = useState(socket.connected);

    const connect = () => {
        socket.on('server_status', (m) => {
          console.log(m);
          setConnected(m);
        });
      };
    
      useEffect(() => {
        connect();
        return () => {
          socket.off('server_status');
        };
      }, []);
    

  return {
    connected,
    socket
  }
}

export default ConnectSocketIo
