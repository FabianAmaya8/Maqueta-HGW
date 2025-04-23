from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

segpedidos_bp = Blueprint('segpedidos_bp', __name__)

@segpedidos_bp.route('/Seg.pedidos')
def mostrar_segpedidos():
    
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('User/personal/Seg.pedidos.html', user=usuario)