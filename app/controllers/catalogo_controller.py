from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

catalogo_bp = Blueprint('catalogo_bp', __name__)

@catalogo_bp.route('/catalogo')
def mostrar_catalogo():
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('User/catalog/catalogo.html', user=usuario)

@catalogo_bp.route('/ViewCatalogo')
def view_catalogo():
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('View/catalogo.html', user=usuario)
