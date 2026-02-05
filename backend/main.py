from typing import Union
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pathlib import Path
import os
from pydantic import BaseModel

from fastapi import FastAPI

class Cartel(BaseModel):
    name: str

app = FastAPI()

# Configura CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los headers
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# Endpoint GET /carteles que devuelve en formato JSON una lista con los nombres de los archivos
# de la carpeta 'carteles' ubicada en el directorio /carteles del servidor.
# utilizando la clase os y sin comprobqar si la carpeta existe o no.
@app.get("/cartelesv2")
def get_carteles():
    carteles_dir = Path("carteles")
    archivos = [archivo.name for archivo in carteles_dir.iterdir() if archivo.is_file()]
    return JSONResponse(content=archivos)   

# Ruta devuelve en un json los nombres de los archivos en el directorio carteles
@app.get("/cartelesv1")
async def list_carteles():
    carteles_dir = "carteles"
    try:
        files = os.listdir(carteles_dir)
        return {"carteles": files}
    except Exception as e:
        return {"error": "Could not list carteles"}


# Ruta que devuelve un cartel a partir de su nombre con método post
# Se valida el nombre del fichero para evitar SSRF
@app.post("/cartelesvalidado")
async def post_cartel(cartel: Cartel):
    # Validar la ruta del archivo
    if ".." in cartel.name or "/" in cartel.name or "\\" in cartel.name:
        return {"error": "Invalid file name"}
    cartel_path = os.path.join("carteles", cartel.name)
    if os.path.isfile(cartel_path):
        return FileResponse(cartel_path)
    else:
        return {"error": "Cartel not found"}
    
# Ruta que devuelve un cartel a partir de su nombre con método post
# No se valida el nombre del fichero para demostrar SSRF
@app.post("/carteles")
async def post_cartel(cartel: Cartel):
    cartel_path = os.path.join("carteles", cartel.name)
    if os.path.isfile(cartel_path):
        return FileResponse(cartel_path)
    else:
        return {"error": "Cartel not found"}