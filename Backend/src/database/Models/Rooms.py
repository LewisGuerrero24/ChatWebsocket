from Libraries import *
from users import User

class Rooms():
    AdminRoom = ListField(StringField())
    Name = StringField()
    Description = StringField()
    DateCreation = DateTimeField()
    AuthoRizedUser = ListField(EmbeddedDocumentField(User))
    