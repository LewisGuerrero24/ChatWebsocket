from .UserDataRepository import UserDataRepository

class UserDataService(UserDataRepository):
    def __init__(self, User):
        super().__init__(User) 

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
    