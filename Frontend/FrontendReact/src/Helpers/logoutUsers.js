import axios from 'axios';
import tokenUtils from "../Hooks/utils";

const logoutUsers = async (setLastActive, navigate) =>{
    try {
    await axios.post("http://localhost:5000/logout");
    tokenUtils.removeToken();
    setLastActive(new Date());
    navigate(`/`)
    window.history.pushState({}, "", "/");
    window.location.reload();
    console.log('cerro session')
    } catch (error) {
    console.error("Error during logout:", error);
  }
}


export default logoutUsers