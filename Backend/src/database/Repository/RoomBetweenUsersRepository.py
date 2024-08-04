
class RoomBetweenUsersRepository():
    
    def __init__(self,ConversationBetweenUsers):
        self.ConversationBetweenUsers = ConversationBetweenUsers
    
    
    def CreateRoomUsers(self,id_primary,id_second):
        newconversation = self.ConversationBetweenUsers(
            id_user_Primary=str(id_primary),
            id_user_Second=str(id_second),
            Messages=[]
            )
        
        newconversation.save()
        return newconversation
            
        
    def ReadDataMessageUser(self, id_primary, id_second,messageNew):
        conversation = self.ConversationBetweenUsers.objects(id_user_Primary=id_primary, id_user_Second=id_second).first()
        return conversation
        
        
        
        
                
    