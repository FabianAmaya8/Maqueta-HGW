from flask import Flask, current_app, Blueprint, jsonify, request

modulo_categoria = Blueprint("modulo_categoria", __name__)

@modulo_categoria.route("/registro_categoria", methods=["POST"])
def registro_categoria():
    try:
        datos = request.get_json()
        nombre_categoria = datos.get("Nombre Categoria")
        with current_app.conexion.cursor() as cursor:
            sql = "INSERT INTO categorias(nombre_categoria) VALUES(%s)"
            cursor.execute(sql, (nombre_categoria,))
            current_app.conexion.commit()
            return "La categoria se ha registrado correctamente"
    except Exception as error:
        return "ha ocurrido un error en el registro: "+str(error)
@modulo_categoria.route("/consulta_categoria", methods=["GET"])
def consulta_categoria():
    try:
        with current_app.conexion.cursor() as cursor:
            sql = "SELECT * FROM categorias"
            cursor.execute(sql)
            consulta = cursor.fetchall()
            return jsonify(consulta)
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)
@modulo_categoria.route("/encabezado_categoria", methods=["GET"])
def encabezado():
    sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'HGW_database' AND TABLE_NAME = 'categorias';"
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            return jsonify(cursor.fetchall())
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)
@modulo_categoria.route("/registro_subcategoria", methods=["POST"])
def registro_subcategoria():
    try:
        datos = request.get_json()
        nombre_subcategoria = datos.get("Nombre Subcategoria")
        categoria = int(datos.get("Categoria"))+1
        with current_app.conexion.cursor() as cursor:
            sql = "INSERT INTO subcategoria(nombre_subcategoria, categoria) VALUES(%s, %s)"
            cursor.execute(sql, (nombre_subcategoria, categoria))
            current_app.conexion.commit()
            return "La subcategoria se ha registrado correctamente"
    except Exception as error:
        return "ha ocurrido un error en el registro: "+str(error)
@modulo_categoria.route("/consulta_subcategoria", methods=["GET"])
def consulta_subcategoria():
    try:
        with current_app.conexion.cursor() as cursor:
            sql = "SELECT * FROM subcategoria"
            cursor.execute(sql)
            consulta = cursor.fetchall()
            return jsonify(consulta)
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)