from .RoomBetweenUsersRepository import RoomBetweenUsersRepository

class RoomBetweenUserService(RoomBetweenUsersRepository):
    def __init__(self, ConversationBetweenUsers, User):
        super().__init__(ConversationBetweenUsers, User)
        
    def CreateRoom(self, User_one, User_second):
        try:
            # Primer Usuario
            d = {"name": User_one}
            user_one = self.verificationUser(d)  
            if user_one is None:
                raise ValueError(f"Usuario {User_one} no encontrado.")
                
            # Consulto al segundo usuario
            l = {"name": User_second}      
            user_second = self.verificationUser(l)
            if user_second is None:
                raise ValueError(f"Usuario {User_second} no encontrado.")
                
            newRoom = self.CreateRoomUsers(str(user_one['id']), str(user_second['id']))
            return newRoom
        except Exception as e:
            print(f"Ocurrió un error al crear la sala: {e}")
            return None
    
    def existConversation(self, idUser_one, ideUser_second):
        try:
            Messages = self.ReadDataMessageUser(idUser_one, ideUser_second)
            return Messages
        except Exception as e:
            print(f"Ocurrió un error al verificar si la conversación existe: {e}")
            return None
    
    def ConversationAndMessages(self, idUser_one, ideUser_second, messageNew):
        try:
            dataMessage = self.ReadDataMessageUser(idUser_one, ideUser_second)
            if dataMessage is not None:
                messages = dataMessage['Messages']
                messages.append(messageNew)
                dataMessage.save()
                print("Mensaje guardado exitosamente")
                returnMessage = self.ReadDataMessageUser(idUser_one, ideUser_second)
                return returnMessage
            else:
                print("No se encontró la conversación para agregar el mensaje.")
                return None
        except Exception as e:
            print(f"Ocurrió un error al gestionar la conversación y los mensajes: {e}")
            return None


            
