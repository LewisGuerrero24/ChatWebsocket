from Libraries import *
from dotenv import load_dotenv
import os

def con():
    try:
        connect(host=os.getenv('MONGODB_HOST'))
        print('Conectado a la base de datos de MongoDB')
    except Exception as e:
        print(f'Error al conectar a la base de datos: {e}')
        return None


   