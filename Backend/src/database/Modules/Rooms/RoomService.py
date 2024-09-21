from .RoomRepository import RoomRepository
from datetime import datetime
from werkzeug.utils import secure_filename

class RoomService(RoomRepository):
    def __init__(self, User, Rol, Rooms):
        super().__init__(User, Rol, Rooms)

    def get_rooms_countss(self):
        return self.get_rooms_counts()
    
    def get_all_roomss(self):
        return self.get_all_rooms()
    
    def create_room(self, name, photo, description, users_admin, authorized_users):
        new_room = self.Rooms(
            Name=name,
            Description=description,
            DateCreation=datetime.utcnow(),
            UsersAdmin=users_admin,
            AuthoRizedUser=authorized_users
        )
        if photo:
            filename = secure_filename(photo.filename)
            new_room.Photo.put(photo, content_type=photo.content_type, filename=filename)
        self.save_rooms(new_room)

    def delete_room(self, room_id):
        return self.detele_room_by_id(room_id) 
    
    def update_room(self, room_id, data, photo=None):
        return self.update_room_by_id(room_id, data, photo)
    
    def get_room_by_name(self, nameRoom):
        roomData = self.verificarRoom(nameRoom)
        if roomData:
            return roomData
    
    def list_room_for_name(self):
        rooms = self.Rooms.objects().only('Name') 
        return [room.Name for room in rooms]