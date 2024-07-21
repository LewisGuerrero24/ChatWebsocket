class UserRepository():
    def __init__(self, TemporalUsuario):
        self.TemporalUsuario = TemporalUsuario

    def existUser(self, data):
        try: 
            usuario_existente = self.TemporalUsuario.objects(nombre=data['name']).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if usuario_existente:
            return usuario_existente
        return usuario_existente
    


    def create_user_(self, name):
        new_user = self.TemporalUsuario(nombre=name)
        try:
            new_user.save()
        except ValueError as e:
            print(f"Ocurrio un error {e}")
        return new_user
    


    def find_user_by_name(self, name):
        return self.TemporalUsuario.objects(nombre=name).first()
    


    def delete_user_(self, user):
        try:
            user.delete()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    