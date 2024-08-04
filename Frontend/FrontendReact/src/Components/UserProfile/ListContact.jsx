import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import tokenUtils from "../../Hooks/utils";



const ListContact = ({name, connected}) => {
  const [data, setData] = useState([]);

  useEffect(()=>{

    const apiUrl = 'http://localhost:5000/user/list'

    axios.get(apiUrl,{ headers: {
      authorization: `Bearer ${tokenUtils.getToken()}`
    }
  }).then(response => {
        setData(response.data);
        console.log(response.data)
      })
 
  },[])


  // const handleSubmit = async(e) => { 
  //   try {

  //    const response = await axios.post('http://localhost:5000/conversation/create', {
  //       id_primary_user,
  //       id_second_user
  //     }, { withCredentials: true});
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }    
  // }

  return (
    <>
     {/* Sidebar */}
     <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">Chat Publico</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">{name}</div>
            <div className="text-xs text-gray-500">{connected ? 'Active' : 'Inactive'}</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {/* Replace with actual active conversations buttons */}
              {data.map(item => (
                <button  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">{item.name.charAt(0).toUpperCase()}</div>
                  <div key={item.id} className="ml-2 text-sm font-semibold">{item.name}</div>
                </button>
               ))}
              {/* Repeat as needed for other active conversations */}
            </div>
          </div>
          {/* Archived conversations section (if needed) */}
        </div>

    </>
  )
}

export default ListContact