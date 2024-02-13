from mongoengine import Document, StringField, FileField


class Usuario(Document):
    apodo = StringField(required=True)
    password = StringField(required=True) 
    # foto = FileField()

    def is_active():
        return True