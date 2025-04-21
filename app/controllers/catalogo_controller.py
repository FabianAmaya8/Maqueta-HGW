from flask import Blueprint, render_template, request, redirect, url_for, session, current_app,jsonify
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual
from .utils.datosProductos import obtener_productos

catalogo_bp = Blueprint('catalogo_bp', __name__)

@catalogo_bp.route('/catalogo')
def mostrar_catalogo():
    #Datos del usuario
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    
    productos = obtener_productos(12)
    if isinstance(productos, str):
        return jsonify({'error': productos}), 500
    

    return render_template('User/catalog/catalogo.html', user=usuario)

@catalogo_bp.route('/ViewCatalogo')
def view_catalogo():
    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('View/catalogo.html', user=usuario)

@catalogo_bp.route('/usuario/catalogo/obtener_productos')
def api_obtener_productos():
    try:
        limit = int(request.args.get('limit', 10))
        productos = obtener_productos(limit)
        if isinstance(productos, str):
            return jsonify({'error': productos}), 500
        return jsonify(productos)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@catalogo_bp.route('/usuario/catalogo/agregar_carrito', methods=['POST'])
def agregar_a_carrito():
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return jsonify({'error': 'Usuario no autenticado'}), 401

    data = request.get_json()
    id_producto = data.get('id_producto')

    if not id_producto:
        return jsonify({'error': 'ID del producto no proporcionado'}), 400

    try:
        conexion = current_app.mysql.connection
        cursor = conexion.cursor()

        # Puedes validar si el producto ya está en el carrito (opcional)
        cursor.execute("""
            INSERT INTO producto_carrito (id_usuario, id_producto, cantidad)
            VALUES (%s, %s, 1)
            ON DUPLICATE KEY UPDATE cantidad = cantidad + 1
        """, (usuario['id_usuario'], id_producto))

        conexion.commit()
        cursor.close()

        return jsonify({'mensaje': 'Producto agregado al carrito exitosamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
