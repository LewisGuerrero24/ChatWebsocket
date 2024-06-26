from Libraries import *


class SocketServer:
    def __init__(self, socketio , app, UserService):
        self.socketio = socketio
        self.app = app
        self.UserService = UserService
     
    def start(self):           
        @self.app.route('/')
        def lading():
            return 'Server'

        @self.socketio.on('connect')
        def handle_connect():
            print("SERVIDOR CONECTADO")
            self.socketio.emit('server_status', True)
        
        @self.socketio.on('join')
        def on_join(data):
            room = data
            join_room(room)
            self.socketio.emit('join_room',True, room=room)

        @self.socketio.on('leave')
        def on_leave(data):
            room = data
            leave_room(room)
            self.socketio.emit('leave_room', True ,room=room)
            
        @self.socketio.on('message')
        def handle_message(data):       
            usuario = self.UserService.handle_messageDb(data)
            res = {'name':usuario['nombre'],'message': usuario.mensajes.get(data['room'],[])}
            send(res, broadcast = True,room=data['room'])