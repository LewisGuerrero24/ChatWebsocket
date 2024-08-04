from ..Repository.RoomBetweenUsersRepository import RoomBetweenUsersRepository

class RoomBetweenUserService(RoomBetweenUsersRepository):
    def __init__(self, ConversationBetweenUsers):
        super().__init__(ConversationBetweenUsers) 
        
    def CreateRoom(self,idUser_one,ideUser_second):
        newRoom = self.CreateRoomUsers(idUser_one, ideUser_second)
        return newRoom
    
    def ConversationAndMessages(self, idUser_one,ideUser_second, messageNew):
        dataMessage = self.ReadDataMessageUser(idUser_one,ideUser_second, messageNew=messageNew)
        if dataMessage is None:
            self.CreateRoom(idUser_one,ideUser_second) 
        else:
            messages = dataMessage['Messages']
            messages.append(messageNew)
            dataMessage.save()
            print("Mensaje Guardado Exitosamente")
            
