from Libraries import *
from flask_debugtoolbar import DebugToolbarExtension
from imports import *

import os


def main():
   con() 
   mongo_db = get_db()  # Obtiene la instancia de la base de datos
   fs = gridfs.GridFS(mongo_db)  
   app = Flask(__name__) 
   CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
   socketio = SocketIO(app,cors_allowed_origins="http://localhost:5173" )
   # Incluir OAuth___________

   app.debug = True
   app.config['SECRET_KEY'] = secrets.token_hex(16)
   app.config['SECURITY_PASSWORD_SALT'] = os.environ.get("SECURITY_PASSWORD_SALT", '146585145368132386173505678016728509634')
   app.config["JWT_SECRET_KEY"] = "x/dgAj77N5y5g84UWZoTchz9TH+at2UK71P8bLlNzex6CrbD4XnyDKeFRIIueFY8cEhgSsvsQ7tM4JzvL1gYbtB4YbqeZ1bAH2Q/mm+ZYsA"
   app.config['WTF_CSRF_SECRET_KEY'] = secrets.token_hex(16)
   csrf = CSRFProtect(app)  
   csrf.init_app(app)

   app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
   jwt = JWTManager(app)
   
   instances = [SocketServer(socketio, app, UserService(TemporalUsuario, User, Rol),
                RoomBetweenUserService(ConversationUserAndUser,User),MessageUser, RoomService(User, Rol, Rooms),fs), 
                AuthManager(app, User, Rol, socketio), SocketController(app, TemporalUsuario),  
                UserController(app, UserService(TemporalUsuario, User, Rol),socketio),
                RoomsController(app, RoomService(User, Rol, Rooms), User, RoomBetweenUserAndRoomService(Rooms, User), UserService(TemporalUsuario, User, Rol),fs),
                ResetPasswordCOntroller(app,ResetPasswordService(User,send_Email)),
                RoomBetweenUserController(app, UserService(TemporalUsuario, User, Rol),RoomBetweenUserService(ConversationUserAndUser, User),socketio, fs)
    ]
   
   if __name__ == '__main__':
      for instance in instances:
        instance.start()
      socketio.run(app, debug=True)
main()
