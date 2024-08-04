from Libraries import *
from .MessagesUser import MessageUser

# from MessagesUser import MessageUser



class ConversationUserAndUser(Document):
    id_user_Primary = StringField(required=True)
    id_user_Second = StringField(required=True)
    Messages = EmbeddedDocumentListField(MessageUser, default=list)
    
    def __init__(self, id_user_Primary, id_user_Second, Messages=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id_user_Primary = id_user_Primary
        self.id_user_Second = id_user_Second
        self.Messages = Messages if Messages is not None else []
