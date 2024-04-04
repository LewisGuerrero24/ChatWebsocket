from Libraries import *

class AuthManager:
    def __init__(self, app,Usuario):
        self.app = app
        self.bcrypt = Bcrypt(app)
        self.login_manager = LoginManager(app)
        self.login_manager.login_view = 'login'
        self.Usuario = Usuario

    def start(self):
        
        @self.login_manager.user_loader
        def load_user(user_id):
            return self.Usuario.objects(pk=user_id).first()

        @self.app.route("/login", methods=['POST'])
        def login():

            apodo = request.json["apodo"]
            password = request.json["password"]
            
            user = self.Usuario.objects(apodo=apodo).first()
            
            
            if user is None:
                return jsonify({"error": "Unauthorized"}), 401
            

            if user and self.bcrypt.check_password_hash(user.password, password):
                #login_user(user)

                # Agrega la información del usuario a la sesión
                session['id'] = str(user.id)
                session['apodo'] = user.apodo

                flash('Login successful!', 'success')
                return jsonify({'message': 'Login successful', 'user_id': str(user.id), 'username': user.apodo})
            else:
                flash('Login failed. Check your username and password.', 'danger')
            return jsonify({'error': 'Invalid username or password'}), 401
        




        @self.app.route("/check_login", methods=['GET'])
        def check_login():
            if current_user.is_authenticated:
                return jsonify({'logged_in': True, 'user_id': str(current_user.id), 'apodo': current_user.username})
            else:
                return jsonify({'logged_in': False})




        @self.app.route("/logout", methods=['GET'])
        @login_required
        def logout():
            logout_user()

            # Elimina la información del usuario de la sesión al hacer logout
            session.pop('user_id', None)
            session.pop('apodo', None)

            return jsonify({'message': 'Logout successful'})




        @self.app.route("/register", methods=['POST'])
        def register():
            apodo = request.json["apodo"]
            password = request.json["password"]

            user_exists = self.Usuario.objects(apodo=apodo).first() is not None

            if user_exists:
                return jsonify({"error": "User already exists"}), 409

            hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = self.Usuario(apodo=apodo, password=hashed_password)
            new_user.save()

            return "Registro exitoso", 200










