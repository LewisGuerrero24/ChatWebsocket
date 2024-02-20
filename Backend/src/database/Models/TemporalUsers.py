from Libraries import *


class TemporalUsuario(Document):
    nombre = StringField(required=True)
    mensajes = ListField(StringField())
    
    def is_active():
        return True