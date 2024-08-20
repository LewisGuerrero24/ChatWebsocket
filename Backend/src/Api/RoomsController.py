from Libraries import *
from bson import ObjectId
import json


class RoomsController:
    def __init__(self, app, RoomService):
        self.app = app
        self.RoomService = RoomService


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
                    'UsersAdmin': [admin.to_json() for admin in room.UsersAdmin],  # Serializa el objeto completo de admin
                    'AuthorizedUser': [user.to_json() for user in room.AuthoRizedUser]  # Serializa el objeto completo de user
                } for room in rooms]

                return jsonify(rooms_list), 200
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
            
            # Buscar los objetos completos de los usuarios
            users_admin = [self.RoomService.User.objects(id=ObjectId(user["id"])).first() for user in users_admin_data]
            authorized_users = [self.RoomService.User.objects(id=ObjectId(user["id"])).first() for user in authorized_user_data]

            if not users_admin:
                return jsonify({"error": "At least one user admin is required"}), 400

            if 'photo' in request.files:
                photo = request.files['photo']
            else:
                photo = None

            try:
                # Guardar el objeto completo de los usuarios en lugar de solo el ID
                self.RoomService.create_room(name, photo, description, users_admin, authorized_users)
                return jsonify({"message": "Room created successfully"}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500

