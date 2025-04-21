from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

retiros_bp = Blueprint('retiros_bp', __name__)

@retiros_bp.route('/retiros')
def mostrar_retiros():
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    
    return render_template('/User/personal/retiros.html', user=usuario)
