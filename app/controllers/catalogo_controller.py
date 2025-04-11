from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

catalogo_bp = Blueprint('catalogo_bp', __name__)

@catalogo_bp.route('/catalogo')
def mostrar_catalogo():
    return render_template('User/catalog/catalogo.html')

