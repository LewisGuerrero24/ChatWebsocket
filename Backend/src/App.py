import database.conexion
from database.Models import message, users


def main():
   database.conexion.con()

   usuario = users.Usuario(apodo='Rex')
   usuario.save()

   '''
   with open('ruta_de_la_foto.jpg', 'rb') as photo_file:
        usuario.foto.put(photo_file, content_type='image/jpeg')
   '''

   messagee = message.Mensaje(mensaje='Hi Brother', id_usuario='65bd8a1c769831b81b24c3ac')
   messagee.save()

   
if __name__ == '__main__':
    main()