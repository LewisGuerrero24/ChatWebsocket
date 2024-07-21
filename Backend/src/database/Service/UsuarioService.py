from ..Repository.UsuarioRepository import UsuarioRepository

class UsuarioService(UsuarioRepository):
    def __ini__(self, User, Rol):
        super().__init__(User, Rol)

    def get_userss(self):
        return self.get_all_users("estudiante")