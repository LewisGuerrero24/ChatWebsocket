
class RoomBetweenUsersRepository():
    
    def __init__(self, ConversationBetweenUsers, User):
        self.ConversationBetweenUsers = ConversationBetweenUsers
        self.User = User
    
    def CreateRoomUsers(self, id_primary, id_second):
        try:
            newconversation = self.ConversationBetweenUsers(
                id_user_Primary=str(id_primary),
                id_user_Second=str(id_second),
                Messages=[]
            )
            newconversation.save()
            return newconversation
        except Exception as e:
            print(f"Ocurrió un error al crear la conversación: {e}")
            return None
            
    def ReadDataMessageUser(self, id_primary, id_second):
        try:
            conversation = self.ConversationBetweenUsers.objects(id_user_Primary=id_primary, id_user_Second=id_second).first()
            if conversation is None:
                conversation = self.ConversationBetweenUsers.objects(id_user_Primary=id_second, id_user_Second=id_primary).first()
            return conversation
        except Exception as e:
            print(f"Ocurrió un error al leer los datos de la conversación: {e}")
            return None
    
    def verificationUser(self, data):
        try:
            usuario_data = self.User.objects(name=data['name']).first()
            if usuario_data:
                return usuario_data
            return None
        except Exception as e:
            print(f"Ocurrió un error al verificar el usuario: {e}")
            return None

    
        
        
        
        
                
    