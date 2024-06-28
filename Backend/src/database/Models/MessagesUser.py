from Libraries import *

class MessageUser(EmbeddedDocument):
    Sender = StringField() #Id_user
    Content = StringField() #Message_user
    TimeStap = DateTimeField() #TimeStap
    
    
    
    