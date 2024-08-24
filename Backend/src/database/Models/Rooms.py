from Libraries import *
from .users import User

class Rooms(Document):
    Name = StringField()
    Photo = FileField()
    Description = StringField()
    DateCreation = DateTimeField()
    UsersAdmin = ListField(ReferenceField(User))
    AuthoRizedUser = ListField(ReferenceField(User))
 
    
    