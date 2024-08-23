from datetime import datetime
from bson import ObjectId

class UserDataRepository():
    def __init__(self, User):
        self.User = User

    def createUser(self, data):
        user = self.User(
            name=data.get('name'),
            password=data.get('password'),
            rol=data.get('rol'),
            fs_uniquifier=data.get('fs_uniquifier', ""),
            contacts=data.get('contacts', []),
            failed_login_attempts=data.get('failed_login_attempts', 0),
            locked_until=data.get('locked_until', datetime.utcnow())
        )
        
        user.save()
        return user

    def userFindAll(self):
        listUser = list()
        for user in self.User.objects:
            userData = {
                "name":user.name,
                "password":user.password
            }
            listUser.append(userData)
        return listUser
    
    def userUniqueUser(self):
         listUsers = []
         object_id = ObjectId("65f7702da6dcd2a675620aa9")
         users = self.User.objects(rol=object_id)

         return users