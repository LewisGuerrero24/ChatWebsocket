from Libraries import *
from datetime import datetime

class SocketServer:
    def __init__(self, socketio , app, UserService, ConversationBetweenUsers, MessageUser):
        self.socketio = socketio
        self.app = app 
        self.UserService = UserService
        self.ConversationBetweenUsers = ConversationBetweenUsers
        self.MessageUser = MessageUser
     
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
            room = data['room']
            join_room(room)
            self.socketio.emit('join_room', True, room=room)
            
        @self.socketio.on('join_room_event')
        def on_join(data):
            if 'room' in data:
                room = data['room']
                join_room(room)
                emit('joined_room', {'msg': f'Joined room: {room}'}, room=room)
            else:
                emit('error', {'msg': "'room' key is missing"})

        @self.socketio.on('leave')
        def on_leave(data):
            room = data['room']
            leave_room(room)
            self.socketio.emit('leave_room', True, room=room)
            
        @self.socketio.on('message')
        def handle_message(data): 
            print(data)
            usuario = self.UserService.handle_messageDb(data)
            res = {'name': usuario['nombre'], 'message': usuario.mensajes.get(data['room'], [])}
            send(res, broadcast=True, room=data['room'])
            
        @self.socketio.on('message_user')
        def handle_message_UserAndUser(data):
            if data is not None:
                # Consulto al primer usuario
                d = {"name": data['user_primary']}
                user_one = self.UserService.get_unique_user(d)
                
                # Consulto al segundo usuario
                l = {"name": data['user_second']}
                user_second = self.UserService.get_unique_user(l)
                
                # Genero la sala de chat usando los IDs de los usuarios
                room = f"chat_{min(user_one['id'], user_second['id'])}_{max(user_one['id'], user_second['id'])}"
                
                # Unir a ambos usuarios a la sala
                join_room(room)
                
                # Crear el objeto mensaje
                message_user = self.MessageUser(Sender=user_one.to_simple_dict(), Content=data['message'], TimeStap=datetime.utcnow())
                
                # Crear la conversación y agregar mensajes
                response_message = self.ConversationBetweenUsers.ConversationAndMessages(str(user_one['id']), str(user_second['id']), message_user)
                
                # Enviar mensaje a la sala
                res = {'sender': message_user.Sender, 'content': message_user.Content, 'timestamp': message_user.TimeStap.strftime('%H:%M:%S')}
                emit('message', res, room=room)
                
                # Notificar a los usuarios que se han unido a la sala
                self.socketio.emit('user_joined_room', {'room': room}, room=room)

            
          
            
            
            
            
       
            
            
            
           