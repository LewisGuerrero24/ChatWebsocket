from Libraries import *


class UserDataController():
    def __init__(self,app,UserDataService, RoomBetweenUserService):
        self.app = app
        self.UserDataService = UserDataService
        self.RoomBetweenUserService = RoomBetweenUserService
     

  
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
            users = self.UserDataService.getAllUserStudents()
            response = [user.name for user in users]
            return jsonify(response),200
        

        @jwt_required
        @self.app.route('/conversation/create', methods = ['POST'])
        def create_Conversation():
            dataUsers = request.json
            print(dataUsers['user_one'])
            d = {"name": dataUsers['user_one']}
            user_one = self.UserDataService.get_unique_user(d)
                
                # Consulto al segundo usuario
            l = {"name": dataUsers['user_two']}
            user_second = self.UserDataService.get_unique_user(l)
            existConversation = self.RoomBetweenUserService.existConversation(str(user_one['id']),str(user_second['id']))
            if existConversation:
                   return jsonify (True), 201
            self.RoomBetweenUserService.CreateRoom(dataUsers['user_one'],dataUsers['user_two'])
            return jsonify (False), 201
            
        @jwt_required
        @self.app.route('/conversation/message', methods = ['GET'])
        def messages_Conversation():
            user_one = request.args.get('user_one')
            user_two = request.args.get('user_two')
            
            d = {"name": user_one}
            user_one = self.UserDataService.get_unique_user(d)
                
                # Consulto al segundo usuario
            l = {"name": user_two}
            user_second = self.UserDataService.get_unique_user(l)
            
            listMessages = list()
            existConversation = self.RoomBetweenUserService.existConversation(str(user_one["id"]),str(user_second["id"]))
            if existConversation is not None:
                 for messages  in existConversation["Messages"]:
                     dataMessages = {"sender":messages["Sender"],"content":messages["Content"],'timestamp': messages["TimeStap"].strftime('%H:%M:%S')}
                     listMessages.append(dataMessages)
                 return jsonify(listMessages), 201
            else:
                return jsonify("No hay Mensajes aun"), 201
            
            