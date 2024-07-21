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
    
    
    
    
    