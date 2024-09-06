from .UserRepository import UserRepository

class UserService(UserRepository):
    def __init__(self,TemporalUsuario,User, Rol):
        super().__init__(TemporalUsuario,User, Rol) 
        
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
    
    def get_unique_user(self,data):
        UserData = self.verificationUser(data)
        if UserData:
            return UserData    

    #User Data Service
    def InsertUser(self, data):
        newUser = self.createUser(data)
        return newUser
    
    def getAllUser(self):
        return self.userFindAll()
    
    def getAllUsers(self, typeUser):
        if typeUser == "docente":
            return self.userUniqueUser("6694027d0d8417fe863bdd09")
        if typeUser == "estudiante":
            return self.userUniqueUser("65f7702da6dcd2a675620aa9")
    
    def verificationUser(self, data):
        try: 
            usuario_data = self.User.objects(name=data['name']).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if usuario_data:
            return usuario_data
        return usuario_data
    
    def get_unique_user(self,data):
        UserData = self.verificationUser(data)
        if UserData:
            return UserData 
    
    
    #COdigo Maicol
    
    
    def get_user_counts(self):
        return self.count_users_by_role()

    # Para los estudiantes
    def get_userss(self):
        return self.get_all_users("estudiante")
    
    def save_student(self, newStudent):
        return self.save_user_student(newStudent)
    
    def delete_user(self, user_id):
        return self.detele_user_by_id(user_id) 
    
    def update_user(self, user_id, data, photo=None):
        return self.update_user_by_id(user_id, data, photo)
    

    # Para los Docentes
    def get_userss_teachers(self):
        return self.get_all_users("docente")
    def delete_user(self, name):
        user = self.find_user_by_name(name)
        if user:
            self.delete_user_(user)
            return {'message': f"Recurso con nombre {name} eliminado exitosamente"}, 200
        return {'error': f"No se encontró el recurso con nombre {name}"}, 404
    
    def search_users(self, query):
        resultado = self.find_user(query) 
        return resultado