from Libraries import *


class TemporalUsuario(Document):
    nombre = StringField(required=True)
    mensajes = DictField()
    
    def is_active():
        return True