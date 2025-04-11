from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

carrito_bp = Blueprint('carrito_bp', __name__)
@carrito_bp.route('/carrito')
def mostrar_carrito():
    return render_template('User/carrito/carrito.html')