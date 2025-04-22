from flask import Flask
from flask_bcrypt import Bcrypt
import pymysql.cursors
from config import Config

#Admin
from app.controllers.admin.main_controller import menu
from app.controllers.admin.producto_controller import modulo_producto
from app.controllers.admin.registro_categoria import modulo_categoria
from app.controllers.admin.bonos_controller import modulo_bonos
from app.controllers.admin.user_controller import modulo_usuarios 
from app.controllers.admin.lists_controller import generales

bcrypt = Bcrypt() 

def create_app():
    app = Flask(__name__, template_folder='templates')
    app.config.from_object(Config)

    bcrypt.init_app(app)  # 🔧 Inicializado con la app

    connection = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )

    from app.controllers.view_controller import view_bp
    from app.controllers.user_controller import user_bp
    from app.controllers.gesUsers_controller import gesUsers_bp
    from app.controllers.gestPersonal_controller import gestPersonal_bp
    from app.controllers.catalogo_controller import catalogo_bp
    from app.controllers.educacion_controller import educacion_bp
    from app.controllers.infoPersonal_controller import infoPersonal_bp
    from app.controllers.transferencias_controller import transferencias_bp
    from app.controllers.retiros_controller import retiros_bp
    from app.controllers.carrito_controller import carrito_bp
    from app.controllers.segpedidos_controller import segpedidos_bp
    from app.controllers.adminpedidos_controller import admin_pedidos_bp 

    app.register_blueprint(view_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(gesUsers_bp)
    app.register_blueprint(gestPersonal_bp)
    app.register_blueprint(catalogo_bp)
    app.register_blueprint(educacion_bp)
    app.register_blueprint(infoPersonal_bp)
    app.register_blueprint(transferencias_bp)
    app.register_blueprint(retiros_bp)
    app.register_blueprint(carrito_bp)
    app.register_blueprint(segpedidos_bp)
    app.register_blueprint(admin_pedidos_bp)

    app.connection = connection
    app.conexion = connection

    #Admin
    app.register_blueprint(menu)
    app.register_blueprint(modulo_producto)
    app.register_blueprint(modulo_categoria)
    app.register_blueprint(modulo_bonos)
    app.register_blueprint(modulo_usuarios)
    app.register_blueprint(generales)

    return app
