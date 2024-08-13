import pathlib
import os
from shutil import rmtree
import time

def timer(route):
    while True:
        delete_pycache(route)
        # time.sleep(2)

def delete_pycache(route):
    directorio = pathlib.Path(route)
    for fichero in directorio.iterdir():
        if fichero.is_dir():
            internal_fichero(fichero)
            pycache_path = fichero / '__pycache__'
            if pycache_path.exists():
                rmtree(pycache_path)
                print("Se eliminó el __pycache__ en:", pycache_path)
            else:
                continue
        
def internal_fichero(datadir):
    for internalfichero in datadir.iterdir():
        pycache_path = internalfichero / '__pycache__'
        if pycache_path.exists():
            rmtree(pycache_path)
            print("Se eliminó el __pycache__ en:", pycache_path)
        else:
            continue

timer('./src')

