from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

segpedidos_bp = Blueprint('segpedidos_bp', __name__)

@segpedidos_bp.route('/Seg.pedidos')
def mostrar_segpedidos():
    return render_template('User/personal/Seg.pedidos.html')