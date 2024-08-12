from mongoengine import get_db
from gridfs import GridFS
from bson import ObjectId
from werkzeug.utils import secure_filename

class UsuarioRepository():
    def __init__(self, User, Rol):
        self.User = User
        self.Rol = Rol
        self.db = get_db()  # Obtiene la instancia de la base de datos actual
        self.fs = GridFS(self.db)  # Inicializa GridFS con la conexión obtenida

    def get_all_users(self, role):
        # Primero, obtengamos el objeto Rol correspondiente
        rol = self.Rol.objects(tipo=role).first()
        if rol:
            # Ahora buscamos los usuarios que tienen este rol
            return self.User.objects(rol=rol)
        return []
    
    def get_user_by_id(self, user_id):
        return self.User.objects(id=user_id).first()
    
    def count_users_by_role(self): 
        counts = {}
        for rol in  self.Rol.objects():
            count = self.User.objects(rol=rol).count()
            counts[rol.tipo] = count
        return counts
    

    def save_user_student(self, new_user):
        new_user.save()

    def detele_user_by_id(self, user_id):
        user = self.User.objects(id=user_id).first()
        if user:
            # Si el usuario tiene una foto, eliminar el archivo de GridFS
            if user.photo:
                file_id = user.photo.grid_id  # Obtener el ID del archivo
                # Eliminar el archivo de GridFS
                self.fs.delete(ObjectId(file_id))
            user.delete()
            return True
        return False 
    
    #Actualizar un usurio 
    def update_user_by_id(self, user_id, data, photo):
        try:
            user = self.User.objects(id=user_id).first()
            if not user:
                raise ValueError("User not found")

            if 'name' in data:
                user.name = data['name']
            
            if 'suspendedAccount' in data:
                user.suspendedAccount = int(data['suspendedAccount'])

            if photo:
                if user.photo:
                    # eliminamos la foto que ya estaba
                    user.photo.delete()
                
                # actualizamos con una nueva
                filename = secure_filename(photo.filename)
                user.photo.put(photo, content_type=photo.content_type, filename=filename)

            user.save()


            
            return user
        
        except Exception as e:
            # Aquí puedes utilizar un logger para registrar el error
            print(f"Error updating user: {str(e)}")
            raise