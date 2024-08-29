import axios from "axios";
import tokenUtils from "../Hooks/utils";
import { toast } from "react-hot-toast";

const callApisRooms = {


 cantidadRooms: async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/room-counts", {
            headers: {
                authorization: `Bearer ${tokenUtils.getToken()}`
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        return {}; 
    }
},

listarRooms: async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/room", {
            headers: {
                authorization: `Bearer ${tokenUtils.getToken()}`
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        console.log("error: ", e)
        return []; 
    }
}, 

guardarRoom: async (sendData) => {
    try {
        const response = await axios.post("http://localhost:5000/api/registrarRoom",
            sendData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${tokenUtils.getToken()}`
            },
            withCredentials: true
          }
        );
  
        console.log(response.data);
        toast.success('Registro exitoso', {
          position: "bottom-right",
          style: {
            background: "green",
            color: "#fff",
          },
        });
  
      } catch (error) {
        console.log('Error during registration:', error);
        toast.error('Error durante el registro', {
          position: "bottom-right",
          style: {
            background: "red",
            color: "#fff",
          },
        });
      }
},
eliminarRoom: async (roomId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/eliminarRoom/${roomId}`, {
        headers: {
            authorization: `Bearer ${tokenUtils.getToken()}`
        },
        withCredentials: true
    });
    console.log(response.data.message); // Mensaje de éxito
    return true;
} catch (e) {
    console.error(e);
    return false; 
}
},

editarRoom: async (sendData, roomId) => {
  try {
      const response = await axios.put(`http://localhost:5000/api/actualizarRoom/${roomId}`,
          sendData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${tokenUtils.getToken()}`
          },
          withCredentials: true
        }
      );

      console.log(response.data);
      toast.success('Actualizacion Realizada', {
        position: "bottom-right",
        style: {
          background: "green",
          color: "#fff",
        },
      });

    } catch (error) {
      console.log('Error during update:', error);
      toast.error('Error durante update', {
        position: "bottom-right",
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
}

}



export default callApisRooms;