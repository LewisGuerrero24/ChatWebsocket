
class ResetPasswordRepository():
    def __init__ (self, User):
        self.user = User
        
        
    def userByEmail(self, email):
        user = self.user.objects(email=email).first()
        return user
            
    def userByToken(self, token):
        user = self.user.objects(reset_password_token=token).first()
        return user    
                
        