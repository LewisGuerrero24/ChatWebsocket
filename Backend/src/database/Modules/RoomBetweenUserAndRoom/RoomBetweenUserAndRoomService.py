from .RoomBetweenUserAndRoomRepository import RoomBetweenUserAndRoomRepository

class RoomBetweenUserAndRoomService(RoomBetweenUserAndRoomRepository):
    def __init__(self, Rooms, User):
        super().__init__(Rooms, User)