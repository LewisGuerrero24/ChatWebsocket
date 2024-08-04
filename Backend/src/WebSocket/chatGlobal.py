from Libraries import *


class SocketServer:
    def __init__(self, socketio , app, UserService,ConversationBetweenUsers, MessageUser):
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
            
        @self.socketio.on('message_user')
        def handle_message_UserAnduser(data):       
            
            if data is not None:
                #Consulto al primer Usuario
                d = {"name":data['user_primary']}
                User_One =  self.UserService.get_unique_user(d)
                
                #Consulto segundo usuario
                l = {"name": data['user_second']}
                user_second = self.UserService.get_unique_user(l)
                
                #Se crea la sala con los dos de los usuarios con mensajes vacios
                messageUSER = self.MessageUser(Sender=str(User_One['id']), Content="How are You?", TimeStap=datetime.utcnow())
                self.ConversationBetweenUsers.ConversationAndMessages(str(User_One['id']),str(user_second['id']),messageUSER)
            
          
            
            
            
            
       
            
            
            
           