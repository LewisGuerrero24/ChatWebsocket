from datetime import datetime
from .users import Usuario
from mongoengine import Document, StringField, ListField, DateTimeField, ReferenceField

class Rooms(Document):
    nombre = StringField(required=True)
    usuarios = ListField(ReferenceField(Usuario))
    contrasena = StringField()
    fecha_creacion = DateTimeField(default=datetime.now)