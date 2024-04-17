from Libraries import *

class ConversationsRooms():
    IdRooms = StringField()
    Messages = ListField(StringField())
    AuthoRizedUser = ListField(StringField())
    