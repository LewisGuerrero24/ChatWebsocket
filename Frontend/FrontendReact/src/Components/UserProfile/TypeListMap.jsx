import React from 'react'
import HandleSubmitListContact from '../../Helpers/HandleSubmitListContact';

const TypeListMap = (data, typeList, name, setSelectedUser, socket, setStatusMessage, setInitialMessages, setNotificationStatus) => {
        const handleUserClick = (userName) => {
            if (setSelectedUser) { // Verifica que setSelectedUser es una función
                setSelectedUser(userName);
                HandleSubmitListContact(name, userName, socket, setStatusMessage, setInitialMessages, setNotificationStatus)
            } else {
                console.error('setSelectedUser is not a function');
            }

        if (!Array.isArray(data)) {
            console.error("El dato no es un array", data);
            return null;
        }

        if (typeList === "room") {

            return data.map(item => (
                <button
                    key={item}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    onClick={() => handleUserClick(item)}
                >
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        {item.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-2 text-sm font-semibold">{item}</div>
                    <div className="h-3 w-3 bg-green-500 rounded-full ml-2"></div>
                </button>
            ))
        } else {
            return data.map(item => (

                <button
                    key={item.id}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    onClick={() => handleUserClick(item.name)}
                >
                    <div className="relative flex items-center justify-center h-10 w-10 bg-indigo-300 rounded-full text-white font-bold">
                        {item.name.charAt(0).toUpperCase()}
                        {item.CountMessages > 0 && (
                            <div className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                                {item.CountMessages}
                            </div>
                        )}
                    </div>

                    <div className="ml-3 text-sm font-semibold text-gray-700">{item.name}</div>
                </button>

            ))
        }
    }
}
export default TypeListMap;