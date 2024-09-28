
from mongoengine import get_db
from gridfs import GridFS
from bson import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
from bson.regex import Regex
from mongoengine import Q

class UserRepository():
    def __init__(self, TemporalUsuario, User,Rol):
        self.TemporalUsuario = TemporalUsuario
        self.User = User
        self.Rol = Rol
        self.db = get_db()  # Obtiene la instancia de la base de datos actual
        self.fs = GridFS(self.db)  # Inicializa GridFS con la conexión obtenida
        

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
        
    

    #Data Repository

    def find_user(self, query):
        regex = f'^{query}'
        results = self.User.objects(Q(name__iregex=regex)).only('name', 'id','suspendedAccount')
        return [{'id': str(user.id), 'name': user.name,"suspendedAccount":user.suspendedAccount} for user in results]

    
    def createUser(self, data):
        user = self.User(
            name=data.get('name'),
            password=data.get('password'),
            rol=data.get('rol'),
            fs_uniquifier=data.get('fs_uniquifier', ""),
            contacts=data.get('contacts', []),
            failed_login_attempts=data.get('failed_login_attempts', 0),
            locked_until=data.get('locked_until', datetime.utcnow())
        )
        
        user.save()
        return user

    def userFindAll(self):
        listUser = list()
        for user in self.User.objects:
            userData = {
                "id": str(user.id),
                "name":user.name,
            }
            listUser.append(userData)
        return listUser
    
    def user_status_Online(self):
        listUser = list()
        for user in self.User.objects:
            if user.status == 1:
                userData = {
                    "id": str(user.id),
                }
                listUser.append(userData)
        return listUser
    
    def userUniqueUser(self,id,rol):
        
         users = self.User.objects(id=id).first()
         print(users["name"])
         if users:
            print(users["contacts"])
            dataContacts = [{"id":contact["id"],"name":contact["name"],"CountMessages":0} for contact in users["contacts"] if contact["rol"] == ObjectId(rol)]
            return dataContacts
         else:
            return None, None
    
    
    #Codigo de Maicol
    
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

            if 'email' in data:
                user.email = data['email']
            
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
    
    def update_user_by_id_status(self, user_id):
            user = self.User.objects(id=user_id).first()
            if user["status"] == 1:
                user["status"] = 0
            user.save()
            userUpdate = self.User.objects(id=user_id).first()
            return userUpdate["status"]
    
    def search_user_name(self, name):
        user = self.User.objects(name=name).first()
        return user
