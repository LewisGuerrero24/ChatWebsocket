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
            
        # @jwt_required
        # @self.app.route('/conversation/create', methods = ['POST'])
        # def create_Conversation():
        #     dataUsers = request.json
        #      # # #Se crea la sala con los dos de los usuarios con mensajes vacios
        #     dataConversation = self.RoomBetweenUserService.CreateRoom(dataUsers.User_One,dataUsers.user_second)
        #     print(dataConversation['id_user_Primary'],dataConversation['id_user_Second'])
            
            
            