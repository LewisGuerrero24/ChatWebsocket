import React, { useEffect, useState } from 'react'

const useRoom = ({socket},nameRoom) => {

  const [statusRoom,setStatusRoom] = useState(true)
  const[urlRoom, setUrlRoom] = useState(nameRoom);
    const joinRoom = () => {
        socket.emit('join',urlRoom);
      };

      

      useEffect(()=>{
        const statusJoin = (m) => {
          setStatusRoom(m);
          console.log(statusRoom)
        }; 
  
        socket.on('join_room', statusJoin);
        return () => {
          socket.off('join_room',statusJoin);
        };
      },[urlRoom])

  return {
    joinRoom,
    statusRoom,
    urlRoom
  }
}

export default useRoom
