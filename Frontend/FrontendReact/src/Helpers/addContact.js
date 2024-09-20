import axios from 'axios';
import React from 'react'
import Swal from "sweetalert2";

const addContact = (name, id,  setStatusListContact) => {
    axios.put('http://localhost:5000/insert/contact', {
        name,
        id
      }, { withCredentials: true }).then((response)=>{
        setStatusListContact(true)

        if(response.data){
            
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario agregado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        }else{
            console.error("user ya existe")
        }

      })
}



export default addContact