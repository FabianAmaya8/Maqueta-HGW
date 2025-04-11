from flask import Flask
from flask_bcrypt import Bcrypt
import pymysql.cursors
from config import Config

bcrypt = Bcrypt() 

def create_app():
    app = Flask(__name__)
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
    app.register_blueprint(view_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(gesUsers_bp)

    app.connection = connection

    return app
