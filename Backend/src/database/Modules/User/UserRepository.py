from bson.regex import Regex
from mongoengine import Q
class UserRepository():
    def __init__(self, TemporalUsuario, User):
        self.TemporalUsuario = TemporalUsuario
        self.User = User

    def existUser(self, data):
        try: 
            usuario_existente = self.TemporalUsuario.objects(nombre=data['name']).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if usuario_existente:
            return usuario_existente
        return usuario_existente
    
    def verificationUser(self, data):
        try: 
            usuario_data = self.User.objects(name=data['name']).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if usuario_data:
            return usuario_data
        return usuario_data
    
    def find_user(self, query):
        regex = f'^{query}'
        results = self.User.objects(Q(name__iregex=regex)).only('name', 'id')
        return [{'id': str(user.id), 'name': user.name} for user in results]
    
    