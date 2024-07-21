class UsuarioRepository():
    def __init__(self, User, Rol):
        self.User = User
        self.Rol = Rol

    def get_all_users(self, role):
        # Primero, obtengamos el objeto Rol correspondiente
        rol = self.Rol.objects(tipo=role).first()
        if rol:
            # Ahora buscamos los usuarios que tienen este rol
            return self.User.objects(rol=rol)
        return []