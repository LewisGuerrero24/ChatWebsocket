from Libraries import *
from MessagesUser import MessageUser

class ConversationsRooms():
    IdRooms = StringField()
    Messages = ListField(EmbeddedDocumentField(MessageUser))
    
    