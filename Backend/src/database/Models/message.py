from mongoengine import Document, StringField, IntField

class Mensaje(Document):
    mensaje = StringField(required=True)
    id_usuario = StringField(required=True)