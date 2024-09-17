import React from 'react'
import notificationService from './notificationService';

const notificationCount = async (data,name) => {
    try {
      const results = await Promise.all(data.map(async (item) => {
        const response = await notificationService(name, item.name);
        
        // Comprobar si la respuesta es válida
        if (!response || typeof response !== 'object') {
          console.warn(`Response is invalid for item: ${item.name}`);
          return item; // Retornar el item sin cambios si la respuesta es inválida
        }
        
        // Comprobar si el ID del item coincide con el ID del remitente en la respuesta
        if (item.id === response.IdSender) {
          item.CountMessages = response.messageNotRead; // Sumar los mensajes no leídos al conteo del item
        }
        
        return item; // Retornar el item actualizado
      }));
      
      // Verificar si el índice 0 de results tiene algún valor específico o cumple con una condición
      if (results.length > 0 ) {
        return data; // Devolver los datos originales si la condición se cumple
      }
  
      return results; // Devolver el array con los datos actualizados
    } catch (error) {
      console.error("Error en notificationCount:", error);
      return data; // Devolver los datos originales en caso de error
    }
  };
  
export default notificationCount