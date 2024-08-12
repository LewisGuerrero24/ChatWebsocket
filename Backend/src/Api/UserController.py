from Libraries import *

class UserController:
    def __init__(self, app, UserService):
        self.app = app
        self.bcrypt = Bcrypt(app)
        self.UserService = UserService

    def start(self):

        # Metodo para los estudiantes
        @self.app.route('/api/usuario', methods=['GET']) 
        @jwt_required()
        def get_users():
            try:
                users = self.UserService.get_userss()
                users_list = [{
                    'id': str(user.id),
                    'name': user.name,
                    'rol': {
                        'id': str(user.rol.id),
                        'name': user.rol.tipo
                    } if user.rol else None,
                    'suspendedAccount': user.suspendedAccount, 
                    'dateEntry': user.dateEntry, 
                    'contacts': user.contacts,
                    'photo': {
                        'url': f'/api/get_photo/{str(user.id)}' if user.photo else None,
                        'filename': user.photo.filename if user.photo else None
                    }
                } for user in users]
                
                return jsonify(users_list), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            

            
        @self.app.route('/api/eliminarUsuario/<string:user_id>', methods=['DELETE'])
        @jwt_required()
        def delete_user(user_id):
            try:
                self.UserService.delete_user(user_id)
                return jsonify({'message': 'User deleted successfully'}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500


        @self.app.route('/api/actualizarUsuario/<string:user_id>', methods=['PUT'])
        @jwt_required()
        def update_userr(user_id):
            try:
                data = request.form.to_dict()  # Obtener datos del formulario
                photo = request.files.get('photo')  # Obtener el archivo de imagen
                updated_user = self.UserService.update_user(user_id, data, photo)
                if updated_user:
                    return jsonify({'message': 'User updated successfully'}), 200
                return jsonify({'error': 'User not found'}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500

       

        @self.app.route('/api/registrarEstudiante', methods=['POST'])   
        @jwt_required()
        def registrarEstudiante():
            if 'name' not in request.form or 'password' not in request.form:
                return jsonify({"error": "Name and password are required"}), 400
            
            name = request.form["name"]
            password = request.form["password"] 
            suspendedAccount = request.form["suspendedAccount"]

            if 'photo' not in request.files:
                return jsonify({"error": "No file part"}), 400

            file = request.files['photo']
            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400
            
            user_exists = self.UserService.User.objects(name=name).first() is not None
            type_rol = self.UserService.Rol.objects(tipo="estudiante").first()

            if user_exists:
                return jsonify({"error": "User already exists"}), 409

            hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')

            new_user = self.UserService.User(name=name, password=hashed_password, rol=type_rol, suspendedAccount=suspendedAccount)

            if file:
                filename = secure_filename(file.filename)
                new_user.photo.put(file, content_type=file.content_type, filename=filename)

            try:
                self.UserService.save_student(new_user) 
                return jsonify({"message": "User created successfully"}), 201
            
            except Exception as e:
                return jsonify({'error': str(e)}), 500



            

        @self.app.route('/api/get_photo/<user_id>', methods=['GET'])
        def get_photo(user_id):
            try:
                user = self.UserService.get_user_by_id(user_id)
                if user and user.photo:
                    response = make_response(send_file(
                        io.BytesIO(user.photo.read()),
                        mimetype=user.photo.content_type,
                        as_attachment=True,
                        download_name=user.photo.filename
                    ))
                    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
                    response.headers['Pragma'] = 'no-cache'
                    response.headers['Expires'] = '0'
                    return response
                return jsonify({"error": "Photo not found"}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            

        @self.app.route('/api/user-counts', methods=['GET'])
        @jwt_required()
        def get_user_counts():
            try:
                counts = self.UserService.get_user_counts()
                return jsonify(counts), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        