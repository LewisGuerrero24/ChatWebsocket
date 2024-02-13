<<<<<<< HEAD
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
=======
import database.conexion
from database.Models import message, users, contacto


def main():
   '''
   database.conexion.con()

   usuario1 = users.Usuario(apodo='User1', password='123456789')
   usuario1.save()

   usuario2 = users.Usuario(apodo='User2', password='987654321')
   usuario2.save()

   contactos_user1 = contacto.Contactos(usuario=usuario1, contactos_ids=[usuario2])
   contactos_user1.save()

   usuario3 = users.Usuario(apodo="User3", password='09808756')
   usuario3.save()
   contactos_user1.agregar_contacto(usuario3)

   messagee = message.Mensaje(mensaje='Hi Brother', id_usuario='65c2e285ece8efdc3db471ff')
   messagee.save()



   with open('ruta_de_la_foto.jpg', 'rb') as photo_file:
        usuario.foto.put(photo_file, content_type='image/jpeg')
   '''

   
>>>>>>> maicol



   if __name__ == '__main__':
      socket_server = SocketServer()
      socket_server.start()
      socketio.run(app, debug=True)
      
main()