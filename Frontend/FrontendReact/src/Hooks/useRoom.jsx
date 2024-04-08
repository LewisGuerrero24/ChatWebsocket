import React, { useEffect, useState } from 'react'

const useRoom = ({socket},nameRoom) => {

  const [statusRoom,setStatusRoom] = useState(true)


    const joinRoom = () => {
        socket.emit('join',nameRoom);
      };

      const statusJoin = (m) => {
        setStatusRoom(m);
        console.log(statusRoom)
      }; 


      useEffect(()=>{
        socket.on('join_room', statusJoin);
        return () => {
          socket.off('join_room',statusJoin);
        };
      },[])

      return {
        joinRoom,
        statusRoom,
      }
}

export default useRoom
