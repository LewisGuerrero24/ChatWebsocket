from mongoengine import get_db
from gridfs import GridFS
from bson import ObjectId
from werkzeug.utils import secure_filename

class RoomRepository():
    def __init__(self, User, Rol, Rooms):
        self.User = User
        self.Rol = Rol
        self.Rooms = Rooms
        self.db = get_db()
        self.fs = GridFS(self.db)
    
    def get_rooms_counts(self):
        return self.Rooms.objects.count()
    

    def get_all_rooms(self):
        return self.Rooms.objects()
    
    def get_room_by_id(self, room_id):
        return self.Rooms.objects(id=room_id).first()
    
    def save_rooms(self, room):
        room.save()

    def detele_room_by_id(self, room_id):
        room = self.Rooms.objects(id=room_id).first()
        if room:
            # Si la room tiene una foto, eliminar el archivo de GridFS
            if room.Photo:
                file_id = room.Photo.grid_id  # Obtener el ID del archivo
                # Eliminar el archivo de GridFS
                self.fs.delete(ObjectId(file_id))
            room.delete()
            return True
        return False 
    

    def update_room_by_id(self, room_id, data, photo):
        try:
            room = self.Rooms.objects(id=room_id).first()
            if not room:
                raise ValueError("Room not found")

            if 'name' in data:
                room.Name = data['name']

            if 'description' in data:
                room.Description = data['description']

            # Obtener los usuarios actuales usando sus IDs
            current_user_admin = set(str(user.id) for user in room.UsersAdmin)
            current_authorized_users = set(str(user.id) for user in room.AuthoRizedUser)

            # Actualizar UsersAdmin
            if 'UsersAdmin' in data:
                # actualizamos los usuarios administradores en rooms
                # Obteniendo los nuevo actualizados y le asignamos los objetos a la room
                new_users_admin = set(str(user_id) for user_id in data['UsersAdmin'])
                room.UsersAdmin = [self.User.objects(id=user_id).first() for user_id in new_users_admin]

                # Eliminar de groupParticipating de los usuarios eliminados
                # Aca deteminamos los usuarios que han sido eliminados, restando la cantidad de usuarios de la room original y 
                # la cantidad de usuarios de la nueva lista actualizada
                users_to_remove = current_user_admin - new_users_admin 

                # Iteramos sobre los ids de los usuarios que se les va a remover la room de groupParticipating
                for user_id in users_to_remove:
                    user = self.User.objects(id=user_id).first()
                    if user:
                        # Obtenemos la room que va a ser eliminada (id)
                        room_id_str = str(room.id)

                        #Obtenemos una lista de Grupos (ids) que de groupParticipating que tiene el usuario
                        user_group_ids = [str(g.id) for g in user.groupParticipating]

                        if room_id_str in user_group_ids:
                            #Recorremos las lista de groupParticipating con la condicion de omitir de room_id_str y guardamos el user actualizado
                            user.groupParticipating = [g for g in user.groupParticipating if str(g.id) != room_id_str]
                            user.save()


                # Añadir el room.id a groupParticipating de los nuevos usuarios, el caso que new_users_admin sea menor a current_user_admin
                # Significa que no hay ningun usuario nuevo y no entrara este buble
                users_to_add = new_users_admin - current_user_admin

                # recorremos la lista de usuarios nuevos
                for user_id in users_to_add:

                    user = self.User.objects(id=user_id).first()
                    if user:
                        room_id_str = str(room.id)
                        user_group_ids = [str(g.id) for g in user.groupParticipating]

                        # si esa room no esta en la lista de (ids) groupParticipating añadimos la room a esa lista
                        if room_id_str not in user_group_ids:
                            user.groupParticipating.append(room)
                            user.save()

            # Actualizar AuthoRizedUser
            if 'AuthoRizedUser' in data:
                new_authorized_users = set(str(user_id) for user_id in data['AuthoRizedUser'])
                room.AuthoRizedUser = [self.User.objects(id=user_id).first() for user_id in new_authorized_users]

                # Eliminar de groupParticipating de los usuarios eliminados
                users_to_remove = current_authorized_users - new_authorized_users
                for user_id in users_to_remove:
                    user = self.User.objects(id=user_id).first()
                    if user:
                        room_id_str = str(room.id)
                        user_group_ids = [str(g.id) for g in user.groupParticipating]
                        if room_id_str in user_group_ids:
                            user.groupParticipating = [g for g in user.groupParticipating if str(g.id) != room_id_str]
                            user.save()

                # Añadir el room.id a groupParticipating de los nuevos usuarios
                users_to_add = new_authorized_users - current_authorized_users
                for user_id in users_to_add:
                    user = self.User.objects(id=user_id).first()
                    if user:
                        room_id_str = str(room.id)
                        user_group_ids = [str(g.id) for g in user.groupParticipating]
                        if room_id_str not in user_group_ids:
                            user.groupParticipating.append(room)
                            user.save()

            # Manejo de la foto
            if photo:
                if room.Photo:
                    room.Photo.delete()
                filename = secure_filename(photo.filename)
                room.Photo.put(photo, content_type=photo.content_type, filename=filename)

            room.save()

            return room
        except Exception as e:
            print(f"Error updating room: {str(e)}")
            raise



    def verificarRoom(self, nameRoom):
        try: 
            room_data = self.Rooms.objects(Name=nameRoom).first()
        except ValueError as e:
            print(f"Ocurrio un error {e}")    
        if room_data:
            return room_data
        return room_data

    def searchGroupTheUser(self, groupParticipatingUser):
        group_ids = [group.id for group in groupParticipatingUser] # Me devuelve un array de ObjectId
        allGroup = self.Rooms.objects()
        dataGroupParticipatingUser = [room for room in allGroup if room.id in group_ids]
        return dataGroupParticipatingUser
