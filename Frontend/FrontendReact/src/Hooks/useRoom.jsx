import React, { useEffect, useState } from 'react'

const useRoom = ({socket},nameRoom) => {

  const [statusRoom,setStatusRoom] = useState(true)
  const[urlRoom,setUrlRoom] = useState(nameRoom)


    const joinRoom = () => {
        socket.emit('join',urlRoom);
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
        urlRoom

      }
}

export default useRoom
