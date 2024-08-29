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
    

        #Actualizar un usurio 
    def update_room_by_id(self, room_id, data, photo):
        try:
            room = self.Rooms.objects(id=room_id).first()
            if not room:
                raise ValueError("User not found")

            if 'name' in data:
                room.Name = data['name']
            
            if 'description' in data:
                room.Description = data['description']


                  # Actualizar UsersAdmin
            if 'UsersAdmin' in data:
                room.UsersAdmin = [ObjectId(user_id) for user_id in data['UsersAdmin']]
            
            # Actualizar AuthoRizedUser
            if 'AuthoRizedUser' in data:
                room.AuthoRizedUser = [ObjectId(user_id) for user_id in data['AuthoRizedUser']]

            if photo:
                if room.Photo:
                    # eliminamos la foto que ya estaba
                    room.Photo.delete()
                
                # actualizamos con una nueva
                filename = secure_filename(photo.filename)
                room.Photo.put(photo, content_type=photo.content_type, filename=filename)

            room.save()

            return room
        except Exception as e:
            # Aquí puedes utilizar un logger para registrar el error
            print(f"Error updating room: {str(e)}")
            raise