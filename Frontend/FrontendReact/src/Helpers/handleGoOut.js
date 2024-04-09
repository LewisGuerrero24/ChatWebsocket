import axios from 'axios';


const handleGoOut = async(name, navigate) => {
  try {
    const response = await axios.delete(`http://localhost:5000/chat/resources/${name}`, {
      withCredentials: true
    });

    if (response.status === 200) {

      console.log('Recurso eliminado exitosamente');
      navigate(`/`)
    } else {
      console.error('Error al eliminar el recurso:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}

export default handleGoOut
