from Libraries import *


class SocketServer:
    def __init__(self, socketio , app, TemporalUsuario):
        self.socketio = socketio
        self.app = app
        self.temporalUsuario = TemporalUsuario
     
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
            usuario_existente = self.temporalUsuario.objects(nombre=data['name']).first()
            if usuario_existente:
                if data['room'] in usuario_existente.mensajes:
                    usuario_existente.mensajes[data['room']].append(data['message'])
                else:
                    message = list()
                    usuario_existente.mensajes[data['room']] = message
                    usuario_existente.mensajes[data['room']].append(data['message'])
                usuario_existente.save()        
            
            usuario = self.temporalUsuario.objects(nombre=data['name']).first()
            print(data['room'])
            res = {'name':usuario['nombre'],'message': usuario.mensajes.get(data['room'],[])}
            send(res, broadcast = True,room=data['room'])


