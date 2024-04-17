from Libraries import *
from decouple import config

def con():
    try:
        connect(host=config('MONGODB_HOST'))
        print('Conectado a la base de datos de MongoDB')
    except Exception as e:
        print(f'Error al conectar a la base de datos: {e}')
        return None


   