from flask import Flask, Blueprint, current_app, request, jsonify

modulo_producto = Blueprint("modulo_producto", __name__)

@modulo_producto.route("/registro_producto", methods = ["POST"])
def registro_producto():
    if(request):
        datos = request.get_json()
        nombre_p = datos.get("Nombre Producto")
        precio_p = datos.get("Precio Producto")
        descripcion = datos.get("Descripción")
        categoria = int(datos.get("Categoria"))+1
        sucategoria = int(datos.get("Subcategoria"))+1
        try:
            with current_app.conexion.cursor() as cursor:
                sql = "INSERT INTO productos(categoria, nombre_producto, precio_producto, descripcion, subcategoria) VALUES(%s, %s, %s, %s, %s)"
                cursor.execute(sql, (categoria, nombre_p, precio_p, descripcion, sucategoria))
                current_app.conexion.commit()
                return "El producto se ha registrado correctamente"
        except Exception as error:
            return "ha ocurrido un error en el registro: \n"+str(error)
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
        return jsonify({"respuesta": "ha ocurrido un error:" + str(error)})