from ..Repository.UserRepository import UserRepository

class UserService(UserRepository):
    def __init__(self,TemporalUsuario):
        super().__init__(TemporalUsuario) 
        
    def handle_messageDb(self, data):
        UsuarioExistente = self.existUser(data)
        print(data)
        if UsuarioExistente:
            if data['room'] in UsuarioExistente.mensajes:
                UsuarioExistente.mensajes[data['room']].append(data['message'])
            else:
                message = list()
                UsuarioExistente.mensajes[data['room']] = message
                UsuarioExistente.mensajes[data['room']].append(data['message'])
            UsuarioExistente.save()  
        return self.existUser(data)
    

    def create_user(self, name):
        new_user = self.create_user_(name)
        return f"Usuario {name} Creado con Exito"
    

    def delete_user(self, name):
        user = self.find_user_by_name(name)
        if user:
            self.delete_user_(user)
            return {'message': f"Recurso con nombre {name} eliminado exitosamente"}, 200
        return {'error': f"No se encontró el recurso con nombre {name}"}, 404