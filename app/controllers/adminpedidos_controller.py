from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

admin_pedidos_bp = Blueprint('admin_pedidos_bp', __name__)

@admin_pedidos_bp.route('/admin_pedidos')
def mostrar_adminpedidos():
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    
    return render_template('/User/personal/admin_pedidos.html', user=usuario)
