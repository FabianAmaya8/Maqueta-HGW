from flask import Blueprint, render_template, request, redirect
import pymysql

inventario_bp = Blueprint('inventario', __name__)

def obtener_conexion():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='1234',
        database='HGW_DATABASE',         
        cursorclass=pymysql.cursors.DictCursor
    )

@inventario_bp.route('/productos-disponibles')
def productos_disponibles():
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM productos WHERE stock > 0")
            productos = cursor.fetchall()
    finally:
        conexion.close()
    return render_template('productos_disponibles.html', productos=productos)

@inventario_bp.route('/vender/<int:id_producto>', methods=['POST'])
def vender_producto(id_producto):
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT stock FROM productos WHERE id_producto = %s", (id_producto,))
            producto = cursor.fetchone()

            if producto and producto['stock'] > 0:
                cursor.execute("UPDATE productos SET stock = stock - 1 WHERE id_producto = %s", (id_producto,))
                conexion.commit()
            else:
                return "Producto agotado", 400
    finally:
        conexion.close()
    return redirect('/productos-disponibles')

@inventario_bp.route('/insertar-producto-prueba', methods=['GET', 'POST'])
def insertar_producto_prueba():
    if request.method == 'POST':
        categoria = request.form['categoria']
        subcategoria = request.form['subcategoria']
        nombre = request.form['nombre']
        precio = request.form['precio']
        imagen = request.form['imagen']
        stock = request.form['stock']

        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO productos (categoria, subcategoria, nombre_producto, precio_producto, imagen_producto, stock)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (categoria, subcategoria, nombre, precio, imagen, stock))
                conexion.commit()
        finally:
            conexion.close()

        return redirect('/productos-disponibles')

    return render_template('formulario_producto.html')
