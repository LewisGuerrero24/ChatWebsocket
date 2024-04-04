import React,{useEffect}from 'react';
import {useParams} from "react-router-dom";
import './css/chat.css';
import Chat from './Chat';



const PublicChat = () => {

  const {name} = useParams();

  return (
    <>
      <Chat name={name}></Chat>
    </>
  );
};

export default PublicChat;
