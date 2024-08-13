
class RoomBetweenUsersRepository():
    
    def __init__(self,ConversationBetweenUsers,User):
        self.ConversationBetweenUsers = ConversationBetweenUsers
        self.User = User
    
    
    def CreateRoomUsers(self,id_primary,id_second):
        newconversation = self.ConversationBetweenUsers(
            id_user_Primary=str(id_primary),
            id_user_Second=str(id_second),
            Messages=[]
            )
        
        newconversation.save()
        return newconversation
            
        
    def ReadDataMessageUser(self, id_primary, id_second):
        conversation = self.ConversationBetweenUsers.objects(id_user_Primary=id_primary, id_user_Second=id_second).first()
        return conversation
    
    def verificationUser(self, data):
        try: 
            usuario_data = self.User.objects(name=data['name']).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if usuario_data:
            return usuario_data
        return usuario_data
    
        
        
        
        
                
    