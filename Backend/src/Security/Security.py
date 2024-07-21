from Libraries import *
from database.conexion import con



MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION = 5

class AuthManager:
    def __init__(self, app, User, Rol):

        self.app = app  
        self.bcrypt = Bcrypt(app)
        self.Usuario = User
        self.Rol = Rol
        self.login_manager = LoginManager(app)
        self.login_manager.login_view = 'login' # Cuando un usuario no autenticado trate de iniciar a una ruta protegida sera redirigido a login
        self.db = con()
        self.principal = Principal(app)
        self.user_datastore = MongoEngineUserDatastore(self.db,User, None)
        self.security = Security(self.app, self.user_datastore)

    def start(self):

        with self.app.app_context():  # Aquí comienza el contexto de la aplicación Flask

            @identity_loaded.connect_via(self.app)
            def on_identity_loaded(sender, identity):
                for role in current_user.roles:
                    identity.provides.add(RoleNeed(role))
        
       
            @self.login_manager.user_loader
            def load_user(user_id):
                return self.Usuario.objects(pk=user_id).first()



            
            @self.app.after_request
            def refresh_expiring_jwts(response):
                try:
                    exp_timestamp = get_jwt()["exp"]
                    now = datetime.now(timezone.utc)
                    target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
                    if target_timestamp > exp_timestamp:
                        access_token = create_access_token(identity=get_jwt_identity())
                        data = response.get_json()
                        if type(data) is dict:
                            data["token"] = access_token 
                            response.data = json.dumps(data)
                    return response
                except (RuntimeError, KeyError):
                    # Case where there is not a valid JWT. Just return the original respone
                    return response







            @self.app.route("/Login", methods=['POST'])
            def login():

                name = request.json["name"]
                password = request.json["password"]
                
                user = self.Usuario.objects(name=name).first()


                if user is None:
                    return jsonify({"error": "Unauthorized"}), 401
                
                # Verifica si el usuario está bloqueado actualmente
                if user.locked_until and user.locked_until > datetime.utcnow():
                    remaining_time = user.locked_until - datetime.utcnow()
                    return jsonify({"error": f"Account is temporarily locked. Please try again after {remaining_time.total_seconds() // 60} minutes.", "remaining_time": int(remaining_time.total_seconds())}), 403

                if user and self.bcrypt.check_password_hash(user.password, password):

                    if "estudiante" in user.rol.tipo or "admin" in user.rol.tipo or "docente" in user.rol.tipo:

                        access_token = create_access_token(identity=name, additional_claims={"rol": user.rol.tipo})
                    
                        login_user(user, remember=True)

                    # Agrega la información del usuario a la sesión
                        session['id'] = str(user.id)
                        session['name'] = user.name
                        
                        response = jsonify({
                            'message': 'Login successful',
                            'user_id': str(user.id), 
                            'username': user.name, 
                            'rol': user.rol.tipo,
                            'token': access_token
                            })
                        return response
                    else:
                        flash('Login failed. You do not have the required role to log in.', 'danger')
                        return jsonify({'error': 'Invalid role'}), 401
                else:
                    user.failed_login_attempts += 1
                    user.save()

                    # Comprueba si se superó el límite de intentos fallidos
                    if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
                        # Bloquea al usuario temporalmente
                        user.locked_until = datetime.utcnow() + timedelta(minutes=LOCKOUT_DURATION)
                        user.failed_login_attempts = 0
                        user.save()

                        return jsonify({"error": f"Too many failed login attempts. Your account is temporarily locked. Please try again after {LOCKOUT_DURATION} minutes."}), 403

                    flash('Login failed. Check your username and password.', 'danger')
                return jsonify({'error': 'Invalid username or password'}), 401
            


            





            @self.app.route('/csrf_token', methods=['GET'])
            def get_csrf_token():
                csrf_token = generate_csrf()
                return jsonify({'csrf_token': csrf_token})





            # Ruta protegida con JWT De Ejemplo
            @self.app.route('/profile', methods=["GET"])
            @jwt_required()
            @roles_required('user','admin') 
            def my_profile():
                current_user = get_jwt_identity()
                # Lógica para obtener detalles del perfil (modifica según tus necesidades)
                return jsonify({"user_id": current_user, "profile_details": "example"}), 200


            
            @self.app.route("/logout", methods=['POST'])
            @login_required
            def logout():
                # Elimina la información del usuario de la sesión al hacer logout
                session.pop('id', None)
                session.pop('name', None)
                response = jsonify({"msg": "logout successful"})
                unset_jwt_cookies(response)
                return response



            @self.app.route("/register", methods=['POST'])
            def register():
                
                name = request.json["name"]
                password = request.json["password"]
                user_exists = self.Usuario.objects(name=name).first() is not None
                type_rol = self.Rol.objects(tipo="estudiante").first()


                if user_exists:
                    return jsonify({"error": "User already exists"}), 409

                hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')
                new_user = self.Usuario(name=name, password=hashed_password, rol=type_rol)
                new_user.save()

                return "Registro exitoso", 200
            
        
