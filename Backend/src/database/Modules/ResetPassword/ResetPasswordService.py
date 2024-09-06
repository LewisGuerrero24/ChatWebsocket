from .ResetPasswordRepository import ResetPasswordRepository
from Libraries import *
from imports import *

class ResetPasswordService(ResetPasswordRepository):
    def __init__(self, User,send_email):
        super().__init__(User)
        self.send_email = send_email
        
    def GeneratedToken(self, email):
        try:
            User = self.userByEmail(email=email)
            if User:
                token = User.set_reset_password_token()
                
                self.send_reset_email(User.email,token[0:5])
            return True
        except Exception as e:
            print(f"Error al generar el token: {e}")
            return False
        
    def send_reset_email(self, email, token):
        try:
            print(token+email)
            send = self.send_email()
            send.data_email(email, token)
        except Exception as e:
            print(f"Error al enviar el correo de restablecimiento: {e}")


    def confirmation_Token(self, token):
        try:
            user = self.userByToken(token)
            if not user or user.token_expires_at < datetime.utcnow():
                return None  
            return user
        except Exception as e:
            print(f"Error al confirmar el token: {e}")
            return None

    def reset_Password(self, token, new_password):
        try:
            user = self.userByToken(token[0:5])
            user.set_password(new_password)
            user.reset_password_token = None
            user.token_expires_at = None
            user.save()
        except Exception as e:
            print(f"Error al restablecer la contraseña: {e}")
            return False
        return True