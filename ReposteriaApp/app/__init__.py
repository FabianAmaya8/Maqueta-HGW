#Este código establece la conexión con la base de datos utilizando PyMySQL
from flask import Flask
import pymysql.cursors
from config import Config
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configuración de la conexión a la base de datos
    connection = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )
    
      # Define the application directory
    #BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # Configura la ruta para guardar las imágenes
    #app.config['POSTS_IMAGES_DIR'] = os.path.join(BASE_DIR, 'static', 'uploads')

    # Asegúrate de que esta carpeta exista
    #os.makedirs(app.config['POSTS_IMAGES_DIR'], exist_ok=True)

    # Importar y registrar los blueprints
    from app.controllers.main_controller import main_bp
    from app.controllers.user_controller import user_bp
    from app.controllers.admin_controller import admin_bp
    from app.controllers.user_management_controller import user_management_bp
    

    app.register_blueprint(main_bp) #registro del blueprint principal
    app.register_blueprint(user_bp) # registro del blueprint de usuario
    app.register_blueprint(admin_bp)
    app.register_blueprint(user_management_bp)

    # Agregar la conexión a la base de datos como un atributo de la aplicación
    app.connection = connection

    return app
