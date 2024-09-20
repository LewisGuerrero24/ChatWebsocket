import axios from 'axios';
import tokenUtils from '../Hooks/utils';

const HandelSubmitEndpointUsers = (setData,setTypeList, typeList) => {
    setTypeList(typeList)
    setData([])
    if(typeList == "docente" || typeList== "estudiante"){
        const apiUrl = 'http://localhost:5000/user/list'
        axios.get(apiUrl, { 
          headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
          params: {
            typeList,
          } 
        }).then(response => {
          setData([...response.data]);
          console.log(response.data);
        });
    }else{
      if(typeList== "room"){
        const apiUrl = 'http://localhost:5000/api/room/forName'
        axios.get(apiUrl, { 
          headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
        }).then(response => {
          console.log("blabla: ", response.data)
          setData([...response.data]);
        });}
    }
  
}

export default HandelSubmitEndpointUsers