from Libraries import *

class ResetPasswordCOntroller():
    def __init__(self,app, resetPasswordService):
        self.app =  app
        self.resetPasswordService = resetPasswordService
    
    def start(self):
        @jwt_required
        @self.app.route('/forgot-password', methods=['POST'])
        def forgot_password():
            data = request.json
            status = self.resetPasswordService.GeneratedToken(data["email"])
            print(jsonify(status))
            return jsonify(status), 201
        
        @jwt_required
        @self.app.route('/reset-password', methods=['GET', 'POST'])
        def reset_password():
           token  = request.args.get('token')
           data_User=self.resetPasswordService.confirmation_Token(token)
           if data_User:
               return jsonify(True),200
           
           if request.method == 'POST':
                data = request.json
                self.resetPasswordService.reset_Password(data["token"],data["password"])
                return jsonify(True), 200