from Libraries import *

class UserController:
    def __init__(self, app, UserService):
        self.app = app
        self.UserService = UserService

    def start(self):

        
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
            

        @self.app.route('/api/get_photo/<user_id>', methods=['GET'])
        def get_photo(user_id):
            try:
                user = self.UserService.get_user_by_id(user_id)
                if user and user.photo:
                    return send_file(
                        io.BytesIO(user.photo.read()),
                        mimetype=user.photo.content_type,
                        as_attachment=True,
                        download_name=user.photo.filename
                    )
                return jsonify({"error": "Photo not found"}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500
