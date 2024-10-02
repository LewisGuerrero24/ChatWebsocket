import axios from "axios";
import tokenUtils from "../Hooks/utils";
import { toast } from "react-hot-toast";


const callApisUserTeachers = {

    listarDocentes:  async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/docente", {
                headers: {
                    authorization: `Bearer ${tokenUtils.getToken()}`
                }
            });
            return response.data;
        } catch (e) {
            console.error(e);
            console.log("error: ", e)
            return []; // Retorna un array vacío en caso de error para evitar problemas en el componente
        }
    },
    
    eliminarUsuario: async (userId) => {
        try {
          const response = await axios.delete(`http://localhost:5000/api/eliminarUsuario/${userId}`, {
              headers: {
                  authorization: `Bearer ${tokenUtils.getToken()}`
              },
              withCredentials: true
          });
          return true;
      } catch (e) {
          console.error(e);
          return false; 
      }
    },
    
     guardarDocente: async (sendData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/registrarDocente",
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
    
    editarDocente: async (sendData, userId) => {
      try {
          const response = await axios.put(`http://localhost:5000/api/actualizarUsuario/${userId}`,
              sendData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${tokenUtils.getToken()}`
              },
              withCredentials: true
            }
          );
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

export default callApisUserTeachers;
