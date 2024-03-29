from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app,cors_allowed_origins="http://localhost:5173" )


@app.route('/')
def index():
    return 'server'

class SocketServer:

    def __init__(self, socketio = socketio, app = app):
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




