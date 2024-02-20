from imports import *
from Libraries import *


def main():
   con()
   app = Flask(__name__)
   app.config['SECRET_KEY'] = 'secret!'
   CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
   socketio = SocketIO(app,cors_allowed_origins="http://localhost:5173" )
   
   
   instances = [SocketServer(socketio, app, TemporalUsuario), AuthManager(app, Usuario)]
   
   if __name__ == '__main__':
      for instance in instances:
        instance.start()
      socketio.run(app, debug=True)
         
main()