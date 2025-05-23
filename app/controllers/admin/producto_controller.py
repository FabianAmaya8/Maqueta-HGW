from flask import Flask, Blueprint, current_app, request, jsonify
import os
import base64
from werkzeug.utils import secure_filename

modulo_producto = Blueprint("modulo_producto", __name__)

@modulo_producto.route("/editar_producto", methods = ["POST"])

@modulo_producto.route("/editar_producto", methods=["POST"])
def editar_producto():
    datos = request.get_json()
    if not datos:
        return "No se recibió ningún JSON", 400

    id_principal = datos.get("id_principal")
    nombre_p     = datos.get("Nombre Producto")
    precio_p     = datos.get("Precio Producto")
    descripcion  = datos.get("Descripción")
    categoria    = datos.get("Categorias")
    subcategoria = datos.get("Subcategoria")
    stock        = datos.get("Stock")
    imagen_b64   = datos.get("imagen")

    faltan = [
        id_principal is None,
        nombre_p     is None,
        precio_p     is None,
        descripcion  is None,
        categoria    is None,
        subcategoria is None,
        stock        is None,
        imagen_b64   is None
    ]
    if any(faltan):
        return "Faltan campos obligatorios.", 400

    try:
        id_principal = int(id_principal)
        categoria    = int(categoria) + 1
        subcategoria = int(subcategoria)
        stock        = int(stock)
    except ValueError:
        return "ID, categoría, subcategoría o stock no válidos.", 400

    try:
        header, encoded = imagen_b64.split(",", 1)
        data = base64.b64decode(encoded)
        ext = header.split("/")[1].split(";")[0]
    except Exception as e:
        return f"Error al decodificar la imagen: {e}", 400

    nombre_seguro = secure_filename(f"{nombre_p.strip().replace(' ', '_')}.{ext}")
    ruta_rel      = os.path.join("uploads", "product_images", nombre_seguro)
    ruta_abs      = os.path.join(current_app.root_path, "static", ruta_rel)

    try:
        os.makedirs(os.path.dirname(ruta_abs), exist_ok=True)
        with open(ruta_abs, "wb") as f:
            f.write(data)
    except Exception as e:
        return f"No se pudo guardar la imagen: {e}", 500

    try:
        with current_app.conexion.cursor() as cursor:
            sql = """
                UPDATE productos SET
                    categoria = %s,
                    nombre_producto = %s,
                    precio_producto = %s,
                    imagen_producto = %s,
                    descripcion = %s,
                    subcategoria = %s,
                    stock = %s
                WHERE id_producto = %s
            """
            cursor.execute(sql, (
                categoria,
                nombre_p,
                precio_p,
                ruta_rel.replace("\\", "/"),
                descripcion,
                subcategoria,
                stock,
                id_principal
            ))
            current_app.conexion.commit()
    except Exception as error:
        return f"Ha ocurrido un error al editar:\n{error}", 500

    return "El producto se ha editado correctamente", 200
@modulo_producto.route("/registro_producto", methods = ["POST"])
def registro_producto():
    datos = request.get_json()
    if not datos:
        return "No se recibió ningún JSON", 400

    nombre_p     = datos.get("Nombre Producto")
    precio_p     = datos.get("Precio Producto")
    descripcion  = datos.get("Descripción")
    categoria    = datos.get("Categorias")
    subcategoria = datos.get("Subcategoria")
    stock        = datos.get("Stock")
    imagen_b64   = datos.get("imagen")            

    faltan = [
        nombre_p     is None,
        precio_p     is None,
        descripcion  is None,
        categoria    is None,
        subcategoria is None,
        stock        is None,
        imagen_b64   is None
    ]
    if any(faltan):
        return "Faltan campos obligatorios.", 400

    try:
        categoria    = int(categoria) + 1
        subcategoria = int(subcategoria)
        stock        = int(stock)
    except ValueError:
        return "Categoría, subcategoría o stock no válidos.", 400

    try:
        header, encoded = imagen_b64.split(",", 1)
        data = base64.b64decode(encoded)
        ext = header.split("/")[1].split(";")[0]
    except Exception as e:
        return f"Error al decodificar la imagen: {e}", 400

    nombre_seguro = secure_filename(f"{nombre_p.strip().replace(' ', '_')}.{ext}")
    ruta_rel      = os.path.join("uploads", "product_images", nombre_seguro)
    ruta_abs      = os.path.join(current_app.root_path, "static", ruta_rel)

    try:
        os.makedirs(os.path.dirname(ruta_abs), exist_ok=True)
        with open(ruta_abs, "wb") as f:
            f.write(data)
    except Exception as e:
        return f"No se pudo guardar la imagen: {e}", 500

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
                ruta_rel.replace("\\", "/"),  
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
    sql = "SELECT pr.id_producto, ca.nombre_categoria as categoria, sc.nombre_subcategoria as subcategoria, pr.nombre_producto, pr.precio_producto, imagen_producto, pr.descripcion, pr.stock FROM productos pr join categorias ca on ca.id_categoria = pr.categoria join subcategoria sc on sc.id_subcategoria = pr.subcategoria"
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