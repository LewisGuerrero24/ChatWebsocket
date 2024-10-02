from Libraries import *
from .users import User

class MessageUser(EmbeddedDocument):
    Sender = DictField(required=True) #Id_user
    Content = StringField(default="",required=False) #Message_user
    FileId = StringField(default="",required = False)
    TimeStap = DateTimeField(required=True) #TimeStap
    Is_read = BooleanField(default=False)
    
    
    
    