from Libraries import *
from bson import ObjectId
import json


class RoomsController:
    def __init__(self, app, RoomService, User, RoomBetweenUserAndRoomService, UserService):
        self.app = app
        self.RoomService = RoomService
        self.User = User
        self.RoomBetweenUserAndRoomService = RoomBetweenUserAndRoomService
        self.UserService = UserService



    def start(self):

        @self.app.route('/api/room-counts', methods=['GET'])
        @jwt_required()
        def get_rooms_counts_all():
            try:
                counts = self.RoomService.get_rooms_countss()
                return jsonify(counts), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        @self.app.route('/api/room', methods=['GET'])
        @jwt_required()
        def get_rooms():
            try:
                rooms = self.RoomService.get_all_rooms()  # Corregido 'get_all_rooms' para coincidir con el nombre de la función
                rooms_list = [{
                    'id': str(room.id),
                    'name': room.Name,
                    'photo': {
                        'url': f'/api/get_photo_room/{str(room.id)}' if room.Photo else None,
                        'filename': room.Photo.filename if room.Photo else None
                    },
                    'description': room.Description,
                    'UsersAdmin': [str(admin.id) for admin in room.UsersAdmin],  # Serializa el objeto completo de admin
                    'AuthorizedUser': [str(user.id) for user in room.AuthoRizedUser]  # Serializa el objeto completo de user
                } for room in rooms]
                print(rooms_list)
                return jsonify(rooms_list), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/room/forName', methods=['GET'])
        @jwt_required()
        def get_rooms_for_name():
            try:
                rooms = self.RoomService.list_room_for_name()
                return jsonify(rooms), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        
        @self.app.route('/api/get_photo_room/<room_id>', methods=['GET'])
        def get_photo_room(room_id):
            try:
                room = self.RoomService.get_room_by_id(room_id)
                if room and room.Photo:
                    response = make_response(send_file(
                        io.BytesIO(room.Photo.read()),
                        mimetype=room.Photo.content_type,
                        as_attachment=True,
                        download_name=room.Photo.filename
                    ))
                    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
                    response.headers['Pragma'] = 'no-cache'
                    response.headers['Expires'] = '0'
                    return response
                return jsonify({"error": "Photo not found"}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            




        @self.app.route('/api/registrarRoom', methods=['POST'])
        @jwt_required()
        def registrarRoom():
            if 'name' not in request.form or 'description' not in request.form or 'UsersAdmin' not in request.form:
                return jsonify({"error": "Name, description, and users_admin are required"}), 400

            name = request.form["name"]
            description = request.form["description"]
            
            # Deserializar los JSON strings en listas de diccionarios
            users_admin_data = json.loads(request.form.get("UsersAdmin", "[]"))
            authorized_user_data = json.loads(request.form.get("AuthoRizedUser", "[]"))

            if not users_admin_data:
                return jsonify({"error": "At least one user admin is required"}), 400

            # Convertir los diccionarios a objetos de usuario
            users_admin = [self.User.objects(id=ObjectId(user["id"])).first() for user in users_admin_data]
            authorized_users = [self.User.objects(id=ObjectId(user["id"])).first() for user in authorized_user_data]

            if 'photo' in request.files:
                photo = request.files['photo']
            else:
                photo = None

            try:
                self.RoomService.create_room(name, photo, description, users_admin, authorized_users)
                return jsonify({"message": "Room created successfully"}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500



        @self.app.route('/api/eliminarRoom/<string:room_id>', methods=['DELETE'])
        @jwt_required()
        def delete_room_controller(room_id):
            try:
                self.RoomService.delete_room(room_id)
                return jsonify({'message': 'User deleted successfully'}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
        
        @self.app.route('/api/actualizarRoom/<string:room_id>', methods=['PUT'])
        @jwt_required()
        def update_roomm(room_id):
            try:
                data = request.form.to_dict()  # Obtener datos del formulario
                photo = request.files.get('photo')  # Obtener el archivo de imagen

                if 'UsersAdmin' in data:
                    data['UsersAdmin'] = [ObjectId(user['id']) for user in json.loads(data['UsersAdmin'])]

                if 'AuthoRizedUser' in data:
                    data['AuthoRizedUser'] = [ObjectId(user['id']) for user in json.loads(data['AuthoRizedUser'])]


                updated_room = self.RoomService.update_room(room_id, data, photo)
                if updated_room:
                    return jsonify({'message': 'room updated successfully'}), 200
                return jsonify({'error': 'room not found'}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500


        # Para las rooms
        @self.app.route('/conversation/room/create', methods = ['POST'])
        @jwt_required()
        def create_Conversation_room():
            data = request.json
            nameRoom = data['nameRoom']
            nameUser = data['nameUserActually']

            nombreUsuarioSala = {"name": nameUser}
            usuario = self.UserService.get_unique_user(nombreUsuarioSala)

            room = self.RoomService.get_room_by_name(nameRoom)

            if not room:
                return jsonify({"success": False, "message": "Room not found"}), 404
            if not usuario:
                return jsonify({"success": False, "message": "User not found"}), 404
            
        # Convertir IDs a str para comparación
            user_id_str = str(usuario.id)
            admin_ids = [str(u.id) for u in room.UsersAdmin]
            authorized_ids = [str(u.id) for u in room.AuthoRizedUser]

            # Verificar si el usuario ya está en la sala
            if user_id_str in admin_ids or user_id_str in authorized_ids:
                return jsonify({"success": True, "room": str(room.id), "message": "User already in room"}), 200


                # Decidimos si agregarlo como administrador o usuario autorizado
            if usuario.rol == '6694027d0d8417fe863bdd09':
                room.UsersAdmin.append(usuario)
                room.save()
            else:
                room.AuthoRizedUser.append(usuario)
                room.save()


            # Verificamos si la sala ya está en el atributo `groupParticipating` del usuario
            if room not in usuario.groupParticipating:
                usuario.groupParticipating.append(room)  # Agregamos la sala al campo groupParticipating
                usuario.save()  # Guardamos los cambios en el usuario
            

            return jsonify({"success": True, "room": str(room.id)}), 201
        

        @self.app.route('/conversation/room/history', methods=['GET'])   
        @jwt_required()
        def messages_Conversation_room():
            nameUser = request.args.get('nameUserActually')
            nameRoom = request.args.get('nameRoom') 

            nombreUsuarioSala = {"name": nameUser}
            usuario = self.UserService.get_unique_user(nombreUsuarioSala)

            room = self.RoomService.get_room_by_name(nameRoom)

            if room in usuario.groupParticipating:
                listMessages = []
                if room.Messages:
                    for message in room.Messages:
                        dataMessages = {
                            "sender": message.Sender,  # Puedes cambiar esto según la estructura de 'Sender'
                            "content": message.Content,
                            "timestamp": message.TimeStap.strftime('%H:%M:%S')
                        }
                        listMessages.append(dataMessages)
                return jsonify(listMessages), 200
            return jsonify({"success": False, "message": "Algo salio mal"}), 403

