from Libraries import *
from database.Models.role import Rol
from flask_security import UserMixin


class User(Document, UserMixin):
    name = StringField(required=True)   
    password = StringField(required=True) 
    email = StringField(required=True)
    photo = FileField()
    rol = ReferenceField(Rol)
    fs_uniquifier = StringField()
    suspendedAccount = IntField(default=1) # 1 significa que no esta suspendido y 0 esta suspendido
    dateEntry = DateTimeField()
    status = IntField()
    contacts = ListField() 
    groupParticipating = ListField(ReferenceField('Rooms'))
    # Atributos de limite de intentos de session 
    failed_login_attempts = IntField(default=0)
    locked_until = DateTimeField()
    reset_password_token = StringField(nullable=True)
    token_expires_at = DateTimeField(nullable=True)

    def is_active(self):
        return True
                
    # Implementar métodos requeridos por RoleMixin si es necesario
    def has_role(self, role):
        return self.rol == role

    def get_roles(self):
        return [self.rol] if self.rol else []
    
    def to_simple_dict(self):
        simple_dict = dict(id= str(self.id), name = self.name)
        return simple_dict
    
    def to_contact_DTO(self):
        contact_user= dict(id= str(self.id), name = self.name, rol = self.rol.id)
        return contact_user
    
    def set_reset_password_token(self):
        self.reset_password_token = uuid.uuid4().hex
        token = self.reset_password_token
        self.token_expires_at = datetime.utcnow() + timedelta(hours=1)
        self.save()
        return token

    def set_password(self, new_password):
        bcrypt = Bcrypt()
        self.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        print(self.password)
        