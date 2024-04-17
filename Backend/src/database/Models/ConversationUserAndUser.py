from Libraries import *
from database.Models.role import Rol

class ConversationUserAndUser():
    id_user_Primary =  StringField()
    id_user_Second = StringField()
    Messages = ListField(StringField())