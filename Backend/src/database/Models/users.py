from Libraries import *
from database.Models.role import Rol

class Usuario(Document, UserMixin, RoleMixin):
    apodo = StringField(required=True)
    password = StringField(required=True) 
    # foto = FileField()
    roles = ReferenceField(Rol)
    fs_uniquifier = StringField()

    failed_login_attempts = IntField(default=0)
    locked_until = DateTimeField()

    def is_active():
        return True
  