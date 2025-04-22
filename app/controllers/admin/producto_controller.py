from flask import Flask, Blueprint, current_app, request, jsonify
import os
import base64
from werkzeug.utils import secure_filename

modulo_producto = Blueprint("modulo_producto", __name__)

@modulo_producto.route("/registro_producto", methods = ["POST"])
def registro_producto():
    # 1️⃣ Recibir y validar el JSON
    datos = request.get_json()
    if not datos:
        return "No se recibió ningún JSON", 400

    nombre_p     = datos.get("Nombre Producto")
    precio_p     = datos.get("Precio Producto")
    descripcion  = datos.get("Descripción")
    categoria    = datos.get("Categorias")
    subcategoria = datos.get("Subcategoria")
    stock        = datos.get("Stock")
    imagen_b64   = datos.get("imagen")            # Data URL: "data:image/png;base64,..."

    # Validación de campos obligatorios
    if not all([nombre_p, precio_p, descripcion, categoria, subcategoria, stock, imagen_b64]):
        return "Faltan campos obligatorios.", 400

    # 2️⃣ Convertir tipos y ajustar categoría
    try:
        categoria    = int(categoria) + 1
        subcategoria = int(subcategoria)
        stock        = int(stock)
    except ValueError:
        return "Categoría, subcategoría o stock no válidos.", 400

    # 3️⃣ Decodificar Base64 de la imagen
    try:
        header, encoded = imagen_b64.split(",", 1)
        data = base64.b64decode(encoded)
        # Extraer extensión desde el header, p.ej. "data:image/png;base64"
        ext = header.split("/")[1].split(";")[0]
    except Exception as e:
        return f"Error al decodificar la imagen: {e}", 400

    # 4️⃣ Preparar rutas y guardar archivo
    nombre_seguro = secure_filename(f"{nombre_p.strip().replace(' ', '_')}.{ext}")
    ruta_rel      = os.path.join("uploads", "product_images", nombre_seguro)
    ruta_abs      = os.path.join(current_app.root_path, "static", ruta_rel)

    try:
        os.makedirs(os.path.dirname(ruta_abs), exist_ok=True)
        with open(ruta_abs, "wb") as f:
            f.write(data)
    except Exception as e:
        return f"No se pudo guardar la imagen: {e}", 500

    # 5️⃣ Insertar en la base de datos, incluyendo imagen_producto
    try:
        with current_app.conexion.cursor() as cursor:
            sql = """
                INSERT INTO productos (
                    categoria,
                    nombre_producto,
                    precio_producto,
                    imagen_producto,
                    descripcion,
                    subcategoria,
                    stock
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                categoria,
                nombre_p,
                precio_p,
                ruta_rel.replace("\\", "/"),  # ruta relativa en DB
                descripcion,
                subcategoria,
                stock
            ))
            current_app.conexion.commit()
    except Exception as error:
        return f"Ha ocurrido un error en el registro:\n{error}", 500

    return "El producto se ha registrado correctamente", 201

@modulo_producto.route("/Productos", methods=["GET"])
def consulta_prodcutos():
    sql = "SELECT * FROM productos"
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            respuesta = cursor.fetchall()
            return jsonify(respuesta)
    except Exception as error:
        return jsonify({"respuesta": "ha ocurrido un error:" + str(error)})
@modulo_producto.route("/encabezado", methods=["GET"])
def encabezado():
    sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'HGW_database' AND TABLE_NAME = 'productos';"
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            return jsonify(cursor.fetchall())
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)
@modulo_producto.route("/eliminar_producto", methods=["GET"])
def eliminar_producto():
    try:
        tabla = request.args.get("tabla")
        columna = request.args.get("columna")
        producto_id = request.args.get("producto_id")
        with current_app.conexion.cursor() as cursor:
            sql = f"DELETE FROM {tabla} WHERE {columna} = %s"
            cursor.execute(sql, (producto_id,))
            current_app.conexion.commit()
            sql2 = f'ALTER TABLE {tabla} AUTO_INCREMENT = 1;'
            cursor.execute(sql2)
            current_app.conexion.commit()
            return "se ha eliminado el producto"
    except Exception as error:
        return "ha ocurrido un error:" + str(error)