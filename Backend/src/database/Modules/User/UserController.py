from Libraries import *
from bson import ObjectId

class UserController:
    def __init__(self, app, UserService,RoomBetweenUserService):
        self.app = app
        self.bcrypt = Bcrypt(app)
        self.UserService = UserService
        self.RoomBetweenUserService = RoomBetweenUserService
     
    def start(self):
        # Cors para los Estudiantes
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
                    'email': user.email, 
                    'contacts': user.contacts,
                    'photo': {
                        'url': f'/api/get_photo/{str(user.id)}' if user.photo else None,
                        'filename': user.photo.filename if user.photo else None
                    }
                } for user in users]
                
                return jsonify(users_list), 200
            
            except Exception as e:
                print(f"Error occurred: {str(e)}")  # Agregar esto para más detalles en el log
                return jsonify({'error': str(e)}), 500

            

            
        @self.app.route('/api/eliminarUsuario/<string:user_id>', methods=['DELETE'])
        @jwt_required()
        def delete_user(user_id):
            try:
                self.UserService.delete_user_id(user_id)
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
            email = request.form["email"]
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

            new_user = self.UserService.User(name=name, email=email, password=hashed_password, rol=type_rol, suspendedAccount=suspendedAccount)

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
            
        @jwt_required()
        @self.app.route('/api/user-counts', methods=['GET'])
        def get_user_counts():
            try:
                counts = self.UserService.get_user_counts()
                return jsonify(counts), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        @jwt_required()
        @self.app.route('/api/search-for-name', methods=['GET'])
        def buscar_usuario_por_nombre():
            try:
                name = request.args.get('name')
                print("ESTE ES MI NOMBRE",name)
                
                if not name:
                    return jsonify({'error': 'Name parameter is required'}), 400
                
                user = self.UserService.search_user_for_name(name)
                
                if not user:
                    return jsonify({'error': 'User not found'}), 404

                userBest = {
                    'id': str(user.id),
                    'name': user.name,
                    'rol': {
                        'id': str(user.rol.id),
                        'name': user.rol.tipo
                    } if user.rol else None,
                    'suspendedAccount': user.suspendedAccount,
                    'dateEntry': user.dateEntry,
                    'email': user.email,
                    'contacts': [],
                    'photo': {
                        'url': f'/api/get_photo/{str(user.id)}' if user.photo else None,
                        'filename': user.photo.filename if user.photo else None
                    }
                }
                return jsonify(userBest), 200
            
            except Exception as e:
                import logging
                logging.error(f"Error occurred: {e}")
                return jsonify({'error': 'Internal server error'}), 500



        
        # Cors para los Docentes
        @jwt_required()
        @self.app.route('/api/docente', methods=['GET']) 
        def get_users_docentes():
            try:
                users = self.UserService.get_userss_teachers()
                users_list = [{
                    'id': str(user.id),
                    'name': user.name,
                    'rol': {
                        'id': str(user.rol.id),
                        'name': user.rol.tipo
                    } if user.rol else None,
                    'suspendedAccount': user.suspendedAccount, 
                    'dateEntry': user.dateEntry, 
                    'email': user.email, 
                    'contacts': [str(contact.id) for contact in user.contacts] if isinstance(user.contacts, list) else [],
                    'photo': {
                        'url': f'/api/get_photo/{str(user.id)}' if user.photo else None,
                        'filename': user.photo.filename if user.photo else None
                    }
                } for user in users]
                
                return jsonify(users_list), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            

        @jwt_required()
        @self.app.route('/api/registrarDocente', methods=['POST'])   
        def registrarDocente():
            if 'name' not in request.form or 'password' not in request.form:
                return jsonify({"error": "Name and password are required"}), 400
            
            name = request.form["name"]
            email = request.form["email"]
            password = request.form["password"] 
            suspendedAccount = request.form["suspendedAccount"]

            if 'photo' not in request.files:
                return jsonify({"error": "No file part"}), 400

            file = request.files['photo']
            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400
            
            user_exists = self.UserService.User.objects(name=name).first() is not None
            type_rol = self.UserService.Rol.objects(tipo="docente").first()

            if user_exists:
                return jsonify({"error": "User already exists"}), 409

            hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')

            new_user = self.UserService.User(name=name, email=email, password=hashed_password, rol=type_rol, suspendedAccount=suspendedAccount)

            if file:
                filename = secure_filename(file.filename)
                new_user.photo.put(file, content_type=file.content_type, filename=filename)

            try:
                self.UserService.save_student(new_user) 
                return jsonify({"message": "User created successfully"}), 201
            
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
            
            #Data controller
        @jwt_required()
        @self.app.route('/user/create', methods=['POST'])
        def create_user():
            data = request.json
            print(data)
            response = self.UserService.InsertUser(data)
            return jsonify(response.name), 201
        
        @jwt_required()
        @self.app.route('/user/list', methods=['GET'])
        def list_user():
            typeUser = request.args.get('typeList')
            name = request.args.get('name')
            response = self.UserService.getAllUsers(typeUser, name)
            return jsonify(response),200
        

        @jwt_required()
        @self.app.route('/conversation/create', methods = ['POST'])
        def create_Conversation():
            dataUsers = request.json
            print(dataUsers['user_one'])
            d = {"name": dataUsers['user_one']}
            user_one = self.UserService.get_unique_user(d)  

                # Consulto al segundo usuario
            l = {"name": dataUsers['user_two']}
            user_second = self.UserService.get_unique_user(l)
            
             # Genero la sala de chat usando los IDs de los usuarios
            room = f"chat_{min(user_one['id'], user_second['id'])}_{max(user_one['id'], user_second['id'])}"
                
            existConversation = self.RoomBetweenUserService.existConversation(str(user_one['id']), str(user_second['id']))
            if existConversation:
                  return jsonify({"success": True, "room": room}), 201
            self.RoomBetweenUserService.CreateRoom(dataUsers['user_one'],dataUsers['user_two'])
            return jsonify({"success": False, "room": room}), 201
            



        @jwt_required()
        @self.app.route('/conversation/message', methods = ['GET'])
        def messages_Conversation():
            user_one = request.args.get('user_one')
            user_two = request.args.get('user_two')
            
            d = {"name": user_one}
            user_one = self.UserService.get_unique_user(d)
                
                # Consulto al segundo usuario
            l = {"name": user_two}
            user_second = self.UserService.get_unique_user(l)
            
            listMessages = list()
            existConversation = self.RoomBetweenUserService.existConversation(str(user_one["id"]),str(user_second["id"]))
            if existConversation is not None:
                 for messages  in existConversation["Messages"]:
                     dataMessages = {"sender":messages["Sender"],"content":messages["Content"],'timestamp': messages["TimeStap"].strftime('%H:%M:%S')}
                     listMessages.append(dataMessages)
                 return jsonify(listMessages), 201
            else:
                return jsonify("No hay Mensajes aun"), 201
            
        @jwt_required()
        @self.app.route('/insert/contact', methods = ['PUT'])
        def insert_Contact():
            data = request.json
            
            userData = self.UserService.insertContact(data)
            if userData:
                return jsonify("Contacto agregado correctamente"), 201
            
            return jsonify("error al agregar contacto")
        
        @jwt_required()
        @self.app.route('/exist/contact', methods = ['PUT'])
        def exist_Contact():
            data = request.json
            
            statusContact = self.UserService.existContact(data)
            if statusContact:
                return jsonify(statusContact["status"]), 201
            return jsonify(statusContact["status"])
        
        
        
        @jwt_required()
        @self.app.route('/notification/newmessage', methods = ['GET'])
        def messages_notificacion():
            user_one = request.args.get('user_one')
            user_two = request.args.get('user_two')

            d = {"name": user_one}
            user_one = self.UserService.get_unique_user(d)
                
                # Consulto al segundo usuario
            l = {"name": user_two}
            user_second = self.UserService.get_unique_user(l)
                
            response = self.RoomBetweenUserService.MessagesIsNotRead(str(user_one['id']),str(user_second['id']))
            print(response)
            return jsonify(response), 200
        
        @jwt_required()
        @self.app.route('/update/statusMessage', methods = ['PUT'])
        def messages_notificacion_status():
            dataUsers = request.json
        
            d = {"name": dataUsers['user_one']}
            user_one = self.UserService.get_unique_user(d)
                
                # Consulto al segundo usuario
            l = {"name": dataUsers['user_two']}
            user_second = self.UserService.get_unique_user(l)
                
            response = self.RoomBetweenUserService.updateMessageStatus(str(user_one['id']),str(user_second['id']))
            print(response)
            return jsonify(response), 200