from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app,cors_allowed_origins="http://localhost:5173" )

@app.route('/')
def index():
    return 'Server'

@socketio.on('connect')
def handle_connect():
    print("SERVIDOR CONECTADO")
    
@socketio.on('message')
def handle_message(data):
     print('received message: ' + data)
     send(data, broadcast = True)


if __name__ == '__main__':
    socketio.run(app, debug=True)