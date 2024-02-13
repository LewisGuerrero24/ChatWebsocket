# from imports import *

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
# con()

# class security():
#      def __init__(self,app = app):
#         self.socketio = socketio
#         self.app = app

# bcrypt = Bcrypt(app)
# login_manager = LoginManager(app)
# login_manager.login_view = 'login'




# @login_manager.user_loader
# def load_user(user_id):
#     return Usuario.objects(pk=user_id).first()
# ñ

# @app.route("/login", methods=['POST'])
# def login():

#     apodo = request.json["apodo"]
#     password = request.json["password"]
    
#     user = Usuario.objects(apodo=apodo).first()
    
    
#     if user is None:
#         return jsonify({"error": "Unauthorized"}), 401
    

#     if user and bcrypt.check_password_hash(user.password, password):
#         #login_user(user)

#         # Agrega la información del usuario a la sesión
#         session['id'] = str(user.id)
#         session['apodo'] = user.apodo

#         flash('Login successful!', 'success')
#         return jsonify({'message': 'Login successful', 'user_id': str(user.id), 'username': user.apodo})
#     else:
#         flash('Login failed. Check your username and password.', 'danger')
#     return jsonify({'error': 'Invalid username or password'}), 401
    



# @app.route("/check_login", methods=['GET'])
# def check_login():
#     if current_user.is_authenticated:
#         return jsonify({'logged_in': True, 'user_id': str(current_user.id), 'apodo': current_user.username})
#     else:
#         return jsonify({'logged_in': False})




# @app.route("/logout", methods=['GET'])
# @login_required
# def logout():
#     logout_user()

#     # Elimina la información del usuario de la sesión al hacer logout
#     session.pop('user_id', None)
#     session.pop('apodo', None)

#     return jsonify({'message': 'Logout successful'})




# @app.route("/register", methods=['POST'])
# def register():
#     apodo = request.json["apodo"]
#     password = request.json["password"]

#     user_exists = Usuario.objects(apodo=apodo).first() is not None

#     if user_exists:
#         return jsonify({"error": "User already exists"}), 409

#     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
#     new_user = Usuario(apodo=apodo, password=hashed_password)
#     new_user.save()

#     return "Registro exitoso", 200




# # if __name__ == '__main__':
# #     app.run(debug=True)








