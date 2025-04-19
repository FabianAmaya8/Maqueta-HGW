from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual


gestPersonal_bp = Blueprint('gestPersonal_bp', __name__)

@gestPersonal_bp.route('/personal')
def gestPersonal():
    
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('./User/personal/personal.html', user=usuario)
