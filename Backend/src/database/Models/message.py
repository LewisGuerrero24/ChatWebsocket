from Libraries import *

class Mensaje(Document):
    mensaje = StringField(required=True)
    id_usuario = StringField(required=True)