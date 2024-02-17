from Libraries import *


class Usuario(Document):
    apodo = StringField(required=True)
    
    def is_active():
        return True