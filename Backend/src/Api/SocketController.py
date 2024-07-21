from Libraries import *

class SocketController:
    def __init__(self ,app, UserService):
        self.app = app
        self.UserService = UserService
        
    def start(self): 
              
        @self.app.route('/chat/resource', methods=['POST'])
        def create_resource():
            name = request.json["name"]
            response = self.UserService.create_user(name)
            return response, 201
                    
        @self.app.route('/chat/resources/<string:name>', methods=['DELETE'])
        def delete_resource(name):
            response, status_code = self.UserService.delete_user(name)
            return jsonify(response), status_code
         
