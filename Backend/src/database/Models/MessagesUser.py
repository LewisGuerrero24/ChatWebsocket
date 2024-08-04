from Libraries import *

class MessageUser(EmbeddedDocument):
    Sender = StringField(required=True) #Id_user
    Content = StringField(required=True) #Message_user
    TimeStap = DateTimeField(required=True) #TimeStap
    
    
    
    