from .UsuarioRepository import UsuarioRepository

class UsuarioService(UsuarioRepository):
    def __init__(self, User, Rol):
        super().__init__(User, Rol)
    
    def get_user_counts(self):
        return self.count_users_by_role()

    # Para los estudiantes
    def get_userss(self):
        return self.get_all_users("estudiante")
    
    def save_student(self, newStudent):
        return self.save_user_student(newStudent)
    
    def delete_user(self, user_id):
        return self.detele_user_by_id(user_id) 
    
    def update_user(self, user_id, data, photo=None):
        return self.update_user_by_id(user_id, data, photo)
    

    # Para los Docentes
    def get_userss_teachers(self):
        return self.get_all_users("docente")