from Libraries import *

class SocketController:
    def __init__(self ,app, TemporalUsuario):
        self.app = app
        self.temporalUsuario = TemporalUsuario
        
    def start(self):      
         @self.app.route('/chat/resource', methods=['POST'])
         def create_resource():
             name = request.json["name"]
             nuevo_usuario = self.temporalUsuario(nombre=name)
             nuevo_usuario.save()
             return f"Usuario {name} Creado con Exito", 201
                    
         @self.app.route('/chat/resources/<string:name>', methods=['DELETE'])
         def delete_resource(name):
            usuario_existente = self.temporalUsuario.objects(nombre=name).first()
            if usuario_existente:
                usuario_existente.delete()
                return jsonify({'message': f"Recurso con nombre {usuario_existente.nombre} eliminado exitosamente"})
            return jsonify({'error': f"No se encontró el recurso con nombre {name}"}), 404
        
         
