from .users import Usuario
from Libraries import *

class Contactos(Document):
    usuario = ReferenceField(Usuario, required=True)
    contactos_ids = ListField(ReferenceField(Usuario))

    def agregar_contacto(self, nuevo_contacto):
        if nuevo_contacto not in self.contactos_ids:
            self.contactos_ids.append(nuevo_contacto)
            self.save()

    def obtener_contactos(self):
        return self.contactos_ids        



