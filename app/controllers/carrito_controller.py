from flask import Blueprint, render_template, request, redirect, url_for, session, current_app,jsonify
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

carrito_bp = Blueprint('carrito_bp', __name__)

@carrito_bp.route('/carrito')
def mostrar_carrito():
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario

    try:
        connection = current_app.connection
        with connection.cursor() as cursor:
            
            cursor.execute("SELECT id_ubicacion, nombre FROM ubicaciones WHERE tipo = 'pais'")
            paises = cursor.fetchall()

            cursor.execute("SELECT id_ubicacion, nombre, ubicacion_padre FROM ubicaciones WHERE tipo = 'ciudad'")
            ciudades = cursor.fetchall()

    except Exception as e:
        print("Error cargando ubicaciones:", e)
        paises, ciudades = [], []

    return render_template('User/carrito/carrito.html', user=usuario, paises=paises, ciudades=ciudades)





@carrito_bp.route('/api/carrito')
def obtener_productos_carrito():
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return jsonify([])

    productos_carrito = []

    try:
        connection = current_app.connection
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id_carrito FROM carrito_compras WHERE id_usuario = %s
            """, (usuario['id_usuario'],))
            carrito = cursor.fetchone()

            if carrito:
                id_carrito = carrito['id_carrito']

                cursor.execute("""
                    SELECT 
                        p.id_producto,
                        p.nombre_producto,
                        p.precio_producto,
                        p.imagen_producto,
                        pc.cantidad_producto
                    FROM productos_carrito pc
                    JOIN productos p ON pc.producto = p.id_producto
                    WHERE pc.carrito = %s
                """, (id_carrito,))
                productos_carrito = cursor.fetchall()

    except Exception as e:
        print("Error al obtener productos del carrito:", e)

    return jsonify(productos_carrito)



@carrito_bp.route('/api/carrito/<int:id_producto>', methods=['PUT'])
def actualizar_cantidad_producto(id_producto):
    data = request.get_json()
    cantidad = data.get("cantidad")
    usuario = obtener_usuario_actual()
    
    if not cantidad or not usuario:
        return jsonify({"success": False}), 400

    try:
        connection = current_app.connection
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE productos_carrito 
                SET cantidad_producto = %s 
                WHERE producto = %s AND carrito = (
                    SELECT id_carrito FROM carrito_compras WHERE id_usuario = %s
                )
            """, (cantidad, id_producto, usuario['id_usuario']))
            connection.commit()
            return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@carrito_bp.route('/api/carrito/<int:id_producto>', methods=['DELETE'])
def eliminar_producto_carrito(id_producto):
    usuario = obtener_usuario_actual()

    try:
        connection = current_app.connection
        with connection.cursor() as cursor:
            cursor.execute("""
                DELETE FROM productos_carrito 
                WHERE producto = %s AND carrito = (
                    SELECT id_carrito FROM carrito_compras WHERE id_usuario = %s
                )
            """, (id_producto, usuario['id_usuario']))
            connection.commit()
            return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@carrito_bp.route('/api/envio', methods=['GET', 'PUT'])
def manejar_info_envio():
    usuario = obtener_usuario_actual()
    if not usuario:
        return jsonify({'error': 'Usuario no autenticado'}), 401

    connection = current_app.connection
    try:
        if request.method == 'GET':
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT u.nombre, d.direccion, d.id_ubicacion AS ciudad, (
                        SELECT ubicacion_padre FROM ubicaciones WHERE id_ubicacion = d.id_ubicacion
                    ) AS pais
                    FROM usuarios u
                    JOIN direcciones d ON d.id_usuario = u.id_usuario
                    WHERE u.id_usuario = %s
                    ORDER BY d.id_direccion DESC
                    LIMIT 1
                """, (usuario['id_usuario'],))
                datos = cursor.fetchone()
                return jsonify(datos)

        elif request.method == 'PUT':
            data = request.get_json()
            with connection.cursor() as cursor:
                # Actualizar o insertar dirección
                cursor.execute("""
                    SELECT id_direccion FROM direcciones
                    WHERE id_usuario = %s
                """, (usuario['id_usuario'],))
                direccion_existente = cursor.fetchone()

                if direccion_existente:
                    cursor.execute("""
                        UPDATE direcciones
                        SET direccion = %s, id_ubicacion = %s
                        WHERE id_usuario = %s
                    """, (data['direccion'], data['ciudad'], usuario['id_usuario']))
                else:
                    cursor.execute("""
                        INSERT INTO direcciones (id_usuario, direccion, id_ubicacion, lugar_entrega)
                        VALUES (%s, %s, %s, 'Casa')
                    """, (usuario['id_usuario'], data['direccion'], data['ciudad']))

                # También actualizar nombre del usuario si se edita
                cursor.execute("""
                    UPDATE usuarios SET nombre = %s WHERE id_usuario = %s
                """, (data['nombre'], usuario['id_usuario']))

                connection.commit()
                return jsonify({'success': True})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
