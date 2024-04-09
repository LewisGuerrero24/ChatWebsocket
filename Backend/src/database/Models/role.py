from Libraries import *

class Rol(Document):
    tipo = StringField(required=True, unique=True)

    def to_json(self):
        return {
            "tipo": self.tipo
        }