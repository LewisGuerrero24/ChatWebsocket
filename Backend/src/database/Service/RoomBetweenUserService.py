from ..Repository.RoomBetweenUsersRepository import RoomBetweenUsersRepository



class RoomBetweenUserService(RoomBetweenUsersRepository):
    def __init__(self, ConversationBetweenUsers,User):
        super().__init__(ConversationBetweenUsers,User) 
        
    def CreateRoom(self,User_one,User_second):
        #Primer Usuario
        d = {"name": User_one}
        user_one = self.verificationUser(d)  
        # Consulto al segundo usuario
        l = {"name": User_second}      
        user_second = self.verificationUser(l)
        newRoom = self.CreateRoomUsers(str(user_one['id']), str(user_second['id']))
        return newRoom
    
    def ConversationAndMessages(self, idUser_one,ideUser_second, messageNew):
        dataMessage = self.ReadDataMessageUser(idUser_one,ideUser_second)
        if dataMessage is not None:
            messages = dataMessage['Messages']
            messages.append(messageNew)
            dataMessage.save()
            print("Mensaje Guardado Exitosamente")
            returnMessage = self.ReadDataMessageUser(idUser_one,ideUser_second)
            return returnMessage
            

            
