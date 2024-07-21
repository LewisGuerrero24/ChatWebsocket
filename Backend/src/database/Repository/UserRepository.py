class UserRepository():
    def __init__(self, TemporalUsuario):
        self.TemporalUsuario = TemporalUsuario

    def existUser(self, data):
        usuario_existente = self.TemporalUsuario.objects(nombre=data['name']).first()
        if usuario_existente:
            return usuario_existente
        return usuario_existente
    
    
    
    
    