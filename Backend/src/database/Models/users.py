from Libraries import *
from database.Models.role import Rol
from flask_security import UserMixin

class User(Document, UserMixin):
    name = StringField(required=True)   
    password = StringField(required=True) 
    photo = FileField()
    rol = ReferenceField(Rol)
    fs_uniquifier = StringField()
    suspendedAccount = IntField(default=1) # 1 significa que no esta suspendido y 0 esta suspendido
    dateEntry = DateTimeField()
    contacts = ListField(ReferenceField('self')) 

    # Atributos de limite de intentos de session 
    failed_login_attempts = IntField(default=0)
    locked_until = DateTimeField()

    def is_active(self):
        return True

    # Implementar métodos requeridos por RoleMixin si es necesario
    def has_role(self, role):
        return self.rol == role

    def get_roles(self):
        return [self.rol] if self.rol else []