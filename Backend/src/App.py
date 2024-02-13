
# import database.conexion
# from database.Models import message, users
from imports import *


def main():
#    database.conexion.con()

#    usuario = users.Usuario(apodo='Rex')
#    usuario.save()

#    '''
#    with open('ruta_de_la_foto.jpg', 'rb') as photo_file:
#         usuario.foto.put(photo_file, content_type='image/jpeg')
#    '''

#    messagee = message.Mensaje(mensaje='Hi Brother', id_usuario='65bd8a1c769831b81b24c3ac')
#    messagee.save()






   if __name__ == '__main__':
      socket_server = SocketServer()
      socket_server.start()
      socketio.run(app, debug=True)
         
main()