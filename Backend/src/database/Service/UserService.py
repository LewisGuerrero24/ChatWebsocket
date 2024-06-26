from ..Repository.UserRepository import UserRepository

class UserService(UserRepository):
    def __init__(self,TemporalUsuario):
        super().__init__(TemporalUsuario) 
        
    def handle_messageDb(self, data):
        UsuarioExistente = self.existUser(data)
        if UsuarioExistente:
            if data['room'] in UsuarioExistente.mensajes:
                UsuarioExistente.mensajes[data['room']].append(data['message'])
            else:
                message = list()
                UsuarioExistente.mensajes[data['room']] = message
                UsuarioExistente.mensajes[data['room']].append(data['message'])
            UsuarioExistente.save()  
        return self.existUser(data)
    