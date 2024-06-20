from Libraries import *
from database.Models.role import Rol

class User(Document, UserMixin, RoleMixin):
    name = StringField(required=True)
    password = StringField(required=True) 
    # foto = FileField()
    rol = ReferenceField(Rol)
    fs_uniquifier = StringField()
    suspendedAccount = IntField(default=1) # 1 significa que no esta suspendido y 0 esta suspendido
    contacts = ListField(ReferenceField('self')) 

    # Atributos de limite de intentos de session 
    failed_login_attempts = IntField(default=0)
    locked_until = DateTimeField()

    def is_active():
        return True
  