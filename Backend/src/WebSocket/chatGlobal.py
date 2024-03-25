from Libraries import *
import time

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
            
        @self.socketio.on('message')
        def handle_message(data):
            usuario_existente = self.temporalUsuario.objects(nombre=data['name']).first()
            if usuario_existente:
                usuario_existente.mensajes.append(data['message'])
                usuario_existente.save()
            else:
                nuevo_usuario = self.temporalUsuario(nombre=data['name'], mensajes=[data['message']])
                nuevo_usuario.save()
                
            usuario = self.temporalUsuario.objects(nombre=data['name']).first()
            res = {'name':usuario['nombre'],'message': usuario['mensajes']}
            time.sleep(2)
            send(res, broadcast = True)


