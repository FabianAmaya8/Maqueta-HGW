from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

educacion_bp = Blueprint('educacion_bp', __name__)
@educacion_bp.route('/educacion')
def educacion():
    return render_template('User/educacion/educacion.html')