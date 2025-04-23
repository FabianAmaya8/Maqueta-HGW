from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
import pymysql

modulo_usuarios=Blueprint('modulo_usuarios',__name__)

bcrypt = Bcrypt()

@modulo_usuarios.route('/consultar_usuarios', methods=['GET'])
def consulta():
    sql='SELECT id_usuario, nombre_usuario, rol, membresia from usuarios'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            resultados = cursor.fetchall()
            return jsonify(resultados)
    except Exception as e:
        return jsonify({'error':'error al agregar usuarios: '+str(e)})
    
@modulo_usuarios.route('/eliminar_usuario', methods=['POST'])
def eliminacion():
    try:
        tabla = request.args.get("tabla")
        columna = request.args.get("columna")
        producto_id = request.args.get("producto_id")
        with current_app.conexion.cursor() as cursor:
            sql = f"DELETE FROM {tabla} WHERE {columna} = %s"
            cursor.execute(sql, (producto_id,))
            current_app.conexion.commit()
            return 'el usuario se ha eliminado exitosamente'
    except Exception as e:
        return jsonify({'error': 'error al eliminar usuario: ' + str(e)})
    
@modulo_usuarios.route('/crear_usuario', methods=['POST'])
def crearUsuario():
    data=request.get_json()
    nombre=data.get('nombre')
    apellido=data.get('apellido')
    usuario=data.get('usuario')
    contrasena=data.get('contraseña')
    hashed=bcrypt.generate_password_hash(contrasena).decode('utf-8')
    correo=data.get('correo')
    contacto=data.get('contacto')
    patrocinador=data.get('patrocinador')
    membresia=data.get('membresia')
    medio_pago=data.get('medio_pago')
    rol=data.get('rol')
    sql='insert into usuarios( nombre, apellido, nombre_usuario, pss, correo_electronico, numero_telefono, patrocinador, membresia, medio_pago, rol) values (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s)'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql, (nombre, apellido, usuario, hashed, correo, contacto, patrocinador, membresia, medio_pago, rol))
            current_app.conexion.commit()
            return 'usuario creado exitosamente'
    except Exception as e:
        return 'ha ocurrido un error: '+ str(e)
    
@modulo_usuarios.route('/encabezado_usuario', methods=['GET'])
def encabezado():
    sql = """
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'HGW_database' 
        AND TABLE_NAME = 'usuarios'
        AND COLUMN_NAME IN ('id_usuario', 'nombre_usuario', 'rol', 'membresia');
    """
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            return jsonify(cursor.fetchall())
    except Exception as error:
        return jsonify({'error': 'ha ocurrido un error en la consulta: ' + str(error)})
@modulo_usuarios.route('/editar_usuario', methods=['POST'])
def edicion():
    data=request.get_json()
    nombre=data.get('nombre')
    apellido=data.get('apellido')
    usuario=data.get('usuario')
    contrasena=data.get('contraseña')
    hashed=bcrypt.generate_password_hash(contrasena).decode('utf-8')
    correo=data.get('correo')
    contacto=data.get('contacto')
    patrocinador=data.get('patrocinador')
    membresia=data.get('membresia')
    medio_pago=data.get('medio_pago')
    rol=data.get('rol')
    id_usuario=data.get('id_usuario')
    sql='update usuarios set nombre = %s, apellido = %s, nombre_usuario = %s, pss = %s, correo_electronico = %s, numero_telefono = %s, patrocinador = %s, membresia = %s, medio_pago = %s, rol = %s WHERE id_usuario = %s'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql, (nombre, apellido, usuario, hashed, correo, contacto, patrocinador, membresia, medio_pago, rol, id_usuario))
            current_app.conexion.commit()
            return 'usuario editado exitosamente'
    except Exception as e:
        return 'ha ocurrido un error: '+ str(e)