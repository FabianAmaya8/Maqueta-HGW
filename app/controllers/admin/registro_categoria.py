from flask import Flask, current_app, Blueprint, jsonify, request

modulo_categoria = Blueprint("modulo_categoria", __name__)

@modulo_categoria.route("/editar_categoria", methods=["POST"])
def editar_categoria():
    try:
        datos = request.get_json()
        id = datos.get("id_principal")
        nombre_categoria = datos.get("Nombre Categoria")
        with current_app.conexion.cursor() as cursor:
            sql = "UPDATE categorias SET nombre_categoria = %s WHERE id_categoria = %s"
            cursor.execute(sql, (nombre_categoria, id))
            current_app.conexion.commit()
            return "La categoria se ha editado correctamente"
    except Exception as error:
        return "ha ocurrido un error en el registro: "+str(error)


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
    
@modulo_categoria.route("/editar_subcategoria", methods=["POST"])
def editar_subcategoria():
    try:
        datos = request.get_json()
        id = datos.get("id_principal")
        nombre_subcategoria = datos.get("Nombre Subcategoria")
        categoria = int(datos.get("Categoria"))+1
        with current_app.conexion.cursor() as cursor:
            sql = "UPDATE subcategoria set nombre_subcategoria = %s, categoria = %s WHERE id_subcategoria = %s"
            cursor.execute(sql, (nombre_subcategoria, categoria, id))
            current_app.conexion.commit()
            return "La subcategoria se ha editado correctamente"
    except Exception as error:
        return "ha ocurrido un error en el registro: "+str(error)

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
@modulo_categoria.route("/consulta_subcategoria_id", methods=["GET"])
def consulta_subcategoria_id():
    try:
        id = request.args.get("id")
        with current_app.conexion.cursor() as cursor:
            sql = "SELECT * FROM subcategoria where categoria = %s"
            cursor.execute(sql, (id))
            consulta = cursor.fetchall()
            return jsonify(consulta)
    except Exception as error:
        return jsonify({error: "ha ocurrido un error en la consulta: "+str(error)})

@modulo_categoria.route("/consulta_subcategoria", methods=["GET"])
def consulta_subcategoria():
    try:
        with current_app.conexion.cursor() as cursor:
            sql = "SELECT sc.id_subcategoria, sc.nombre_subcategoria, ct.nombre_categoria as categoria FROM subcategoria sc join categorias ct on ct.id_categoria = sc.categoria"
            cursor.execute(sql)
            consulta = cursor.fetchall()
            return jsonify(consulta)
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)
@modulo_categoria.route("/encabezado_subcategoria", methods=["GET"])
def encabezado_subcategoria():
    sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'HGW_database' AND TABLE_NAME = 'subcategoria';"
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            return jsonify(cursor.fetchall())
    except Exception as error:
        return "ha ocurrido un error en la consulta: "+str(error)