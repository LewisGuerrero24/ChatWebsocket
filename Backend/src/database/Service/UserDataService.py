from ..Repository.UserDataRepository import UserDataRepository

class UserDataService(UserDataRepository):
    def __init__(self, User):
        super().__init__(User) 

    def InsertUser(self, data):
        newUser = self.createUser(data)
        return newUser
    
    def getAllUser(self):
        return self.userFindAll()