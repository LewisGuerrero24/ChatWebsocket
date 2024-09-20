from Libraries import *
from .users import User

class MessageUser(EmbeddedDocument):
    Sender = DictField(required=True) #Id_user
    Content = StringField(required=True) #Message_user
    TimeStap = DateTimeField(required=True) #TimeStap
    Is_read = BooleanField(default=False)
    
    
    
    