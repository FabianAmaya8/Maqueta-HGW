from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

transferencias_bp = Blueprint('transferencias_bp', __name__)
@transferencias_bp.route('/transferencias')
def mostrar_trasferencias():
    return render_template('User/personal/transferencias.html')