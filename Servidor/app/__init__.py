from config import datos_conexion_db
from flask import Flask
from app.controllers.producto_controller import modulo_producto
from app.controllers.main_controller import menu
import pymysql

def crear_app():
    app = Flask(__name__)
    app.config.from_object(datos_conexion_db)
    conexion = pymysql.connect(
        host = app.config["MYSQL_HOST"],
        user = app.config["MYSQL_USER"],
        password = app.config["MYSQL_PASSWORD"],
        database = app.config["MYSQL_DB"],
        cursorclass = pymysql.cursors.DictCursor
    )
    app.conexion = conexion
    app.register_blueprint(modulo_producto)
    app.register_blueprint(menu)
    return app