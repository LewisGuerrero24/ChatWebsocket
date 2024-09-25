import axios from 'axios';
import tokenUtils from '../Hooks/utils';
import notificationService from './notificationService';
import notificationCount from './notificationCount';

const HandelSubmitEndpointUsers = (setData, setTypeList, typeList, name) => {

  setTypeList(typeList)
  if (typeList == "docente" || typeList == "estudiante") {
    const apiUrl = 'http://localhost:5000/user/list'
    axios.get(apiUrl, {
      headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
      params: {
        typeList,
        name
      }
    }).then(response => {
      const data = notificationCount(response.data, name)
      data.then(res => {
        setData([])
        setData([...res]);

      })
    });
  } else {
      if(typeList == "room"){
        const apiUrl = 'http://localhost:5000/api/room/groupParticipating'
        axios.get(apiUrl, { 
          headers: { authorization: `Bearer ${tokenUtils.getToken()}` },
          params: {
            name
          }
        }).then(response => {
          setData([])
          setData([...response.data]);
          console.log("Aca esta la data de las roomssss: ", response.data)
        });
      }
    }
  }

export default HandelSubmitEndpointUsers