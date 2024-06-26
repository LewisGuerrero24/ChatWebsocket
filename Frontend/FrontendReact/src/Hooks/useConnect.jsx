import { useEffect, useState } from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:5000')

const useConnect = () => {

        const [connected, setConnected] = useState(socket.connected);

        const handleServerStatus = (m) => {
          console.log(m);
          setConnected(m);
        };

    const connect = () => {
        socket.on('server_status', handleServerStatus);
      };
      useEffect(() => {
        connect();
        return () => {
          socket.off('server_status', handleServerStatus);
        };
      }, []);
  return {
    connected,
    socket
  }
}

export default useConnect
