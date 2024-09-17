from Libraries import *
from .users import User
from .MessagesUser import MessageUser


    
class Rooms(Document):
    Name = StringField()
    Photo = FileField()
    Description = StringField()
    DateCreation = DateTimeField()
    UsersAdmin = ListField(ReferenceField('User'))
    AuthoRizedUser = ListField(ReferenceField('User'))
    Messages = EmbeddedDocumentListField(MessageUser, default=list)
 
    
    