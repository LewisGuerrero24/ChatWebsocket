from Libraries import *

class SocketServer:
    def __init__(self, socketio , app ):
        self.socketio = socketio
        self.app = app
     
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
            # print('received message: ' +data)
            res = {'name':data['name'],'message': data['message']}
            send(res, broadcast = True)


