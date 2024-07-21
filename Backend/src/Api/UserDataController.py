from Libraries import *


class UserDataController():
    def __init__(self,app,UserDataService):
        self.app = app
        self.UserDataService = UserDataService


    def start(self):
        @self.app.route('/user/create', methods=['POST'])
        def create_user():
            data = request.json
            print(data)
            response = self.UserDataService.InsertUser(data)
            return jsonify(response.name), 201
        
        @jwt_required
        @self.app.route('/user/list', methods=['GET'])
        def list_user():
            response = self.UserDataService.getAllUser()
            return jsonify(response),200
            