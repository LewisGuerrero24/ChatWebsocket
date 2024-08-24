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