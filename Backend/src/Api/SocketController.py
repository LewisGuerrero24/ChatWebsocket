from Libraries import *

class SocketController:
    def __init__(self ,app, TemporalUsuario):
        self.app = app
        self.temporalUsuario = TemporalUsuario
  
        
    def start(self):   
            
         @self.app.route('/chat/resource/<string:name>', methods=['POST'])
         def create_resource(name):
             nuevo_usuario = self.temporalUsuario(nombre=name)
             nuevo_usuario.save()
             return f"Usuario {name} Creado con Exito", 201
                
         @self.app.route('/chat/resource/<string:name>', methods=['DELETE'])
         def delete_resource(name):
            usuario_existente = self.temporalUsuario.objects(nombre=name).first()
            if usuario_existente:
                usuario_existente.delete()
                return jsonify({'message': f"Recurso con nombre {usuario_existente.nombre} eliminado exitosamente"})
            return abort(404, description="Error al eliminar Usuario")

        
         