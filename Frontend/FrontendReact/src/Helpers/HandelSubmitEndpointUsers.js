import axios from 'axios';
import tokenUtils from '../Hooks/utils';

const HandelSubmitEndpointUsers = (setData,setTypeList, typeList) => {

    setTypeList(typeList)
    if(typeList == "docente" || typeList== "estudiante"){
        const apiUrl = 'http://localhost:5000/user/list'
        axios.get(apiUrl, { 
          headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
          params: {
            typeList,
          } 
        }).then(response => {
          setData(response.data);
          console.log(response.data);
        });
    }else{
        const apiUrl = 'http://localhost:5000/api/room'
        axios.get(apiUrl, { 
          headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
        }).then(response => {
          setData(response.data);
          console.log(response.data);
        });

    }
   


}

export default HandelSubmitEndpointUsers