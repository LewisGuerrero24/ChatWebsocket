from Libraries import *
from flask import Response
from bson import ObjectId

class RoomBetweenUserController:
    def __init__(self, app, UserService,RoomBetweenUserService,socketio, GridDf):
        self.app = app
        self.bcrypt = Bcrypt(app)
        self.UserService = UserService
        self.RoomBetweenUserService = RoomBetweenUserService
        self.socketio = socketio
        self.GridDf = GridDf
        
    def start(self):
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
                     file_data = {
                                "file_id": "",
                                "filename": ""
                            }
                     if messages["FileId"] != "":
                         file = self.GridDf.get(ObjectId(messages["FileId"]))
                         file_data = {
                            "file_id": messages["FileId"],
                            "filename": file.filename
                            }
                     dataMessages = {"sender":messages["Sender"],"content":messages["Content"],'timestamp': messages["TimeStap"].strftime('%H:%M:%S'),"file":file_data}
                     listMessages.append(dataMessages)
                 return jsonify(listMessages), 201
            else:
                return jsonify("No hay Mensajes aun"), 201
            
        @jwt_required()
        @self.app.route('/notification/newmessage', methods = ['GET'])
        def messages_notificacion():
            user_one = request.args.get('user_one')
            user_two = request.args.get('user_two')
            print("este es el segundo nombre: "+user_two)

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
            
        @jwt_required()
        @self.app.route('/files/download')
        def get_file():
            try:
                file_id = request.args.get('id_file')
                file = self.GridDf.get(ObjectId(file_id))
                return Response(file.read(), mimetype='application/octet-stream',
                                headers={"Content-Disposition": f"attachment;filename={file.filename}"})
            except Exception as e:
                return str(e), 404