from mongoengine import Document, StringField, FileField


class Usuario(Document):
    apodo = StringField(required=True)
    foto = FileField()