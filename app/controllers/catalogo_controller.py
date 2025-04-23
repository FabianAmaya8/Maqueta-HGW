import traceback

from flask import Blueprint, render_template, request, jsonify, current_app
from .utils.datosUsuario import obtener_usuario_actual
from .utils.datosProductos import obtener_productos

catalogo_bp = Blueprint('catalogo_bp', __name__)

@catalogo_bp.route('/catalogo')
def mostrar_catalogo():
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    return render_template('User/catalog/catalogo.html', user=usuario)

@catalogo_bp.route('/ViewCatalogo')
def view_catalogo():
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
        return jsonify(productos), 200

    except Exception:
        current_app.logger.exception("Error en api_obtener_productos")
        return jsonify({'error': 'Error interno al obtener productos'}), 500

@catalogo_bp.route('/usuario/catalogo/agregar_carrito', methods=['POST'])
def agregar_a_carrito():
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return jsonify({'error': 'Usuario no autenticado'}), 401

    data = request.get_json(silent=True) or {}
    id_producto = data.get('id_producto')

    # Validar id_producto
    try:
        id_producto = int(id_producto)
        if id_producto <= 0:
            raise ValueError()
    except Exception:
        return jsonify({'error': 'ID del producto inválido o no proporcionado'}), 400

    try:
        conexion = current_app.connection
        if conexion is None:
            raise RuntimeError("Conexión a BD no disponible")

        cursor = conexion.cursor()

        # 1) Buscar carrito existente
        cursor.execute(
            "SELECT id_carrito FROM carrito_compras WHERE id_usuario = %s",
            (usuario['id_usuario'],)
        )
        fila = cursor.fetchone()

        if fila:
            # Puede ser dict o tupla
            if isinstance(fila, dict):
                id_carrito = fila.get('id_carrito')
            else:
                id_carrito = fila[0]
        else:
            # 2) Crear carrito nuevo
            cursor.execute(
                "INSERT INTO carrito_compras (id_usuario) VALUES (%s)",
                (usuario['id_usuario'],)
            )
            conexion.commit()
            # Volver a leer
            cursor.execute(
                "SELECT id_carrito FROM carrito_compras WHERE id_usuario = %s",
                (usuario['id_usuario'],)
            )
            nueva = cursor.fetchone()
            if isinstance(nueva, dict):
                id_carrito = nueva.get('id_carrito')
            else:
                id_carrito = nueva[0]

        if not id_carrito:
            raise RuntimeError("No se pudo determinar id_carrito")

        # 3) Insertar o incrementar en productos_carrito
        cursor.execute("""
            INSERT INTO productos_carrito (producto, cantidad_producto, carrito)
            VALUES (%s, 1, %s)
            ON DUPLICATE KEY UPDATE cantidad_producto = cantidad_producto + 1
        """, (id_producto, id_carrito))

        conexion.commit()
        cursor.close()

        return jsonify({'mensaje': 'Producto agregado al carrito exitosamente'}), 200

    except Exception:
        current_app.logger.exception("Error en agregar_a_carrito")
        return jsonify({'error': 'Error interno al agregar al carrito'}), 500
