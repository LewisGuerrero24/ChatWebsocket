from Libraries import *
from database.Models.role import Rol

class User(Document, UserMixin, RoleMixin):
    name = StringField(required=True)
    password = StringField(required=True) 
    # foto = FileField()
    rol = ReferenceField(Rol)
    fs_uniquifier = StringField()

    failed_login_attempts = IntField(default=0)
    locked_until = DateTimeField()

    def is_active():
        return True
  