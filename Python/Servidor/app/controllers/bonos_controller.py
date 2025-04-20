from flask import Blueprint, request, jsonify, current_app
import pymysql

modulo_bonos = Blueprint('modulo_bonos', __name__)

@modulo_bonos.route('/consultaBonos', methods=['POST'])
def consultar_bonos():
    datos = request.get_json()
    sql= 'select * from bonos'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            consulta = cursor.fetchall()
            current_app.conexion.commit()
            return jsonify(consulta)
    except Exception as e:
        return jsonify({'error': 'Error al consultar bonos'}), 500

@modulo_bonos.route('/agregarBono', methods=['POST'])
def agregar_bonos():
    data = request.get_json()
    nombre= data.get('nombre_bono')
    porcentaje=data.get('porcentaje')
    tipo=data.get('tipo')
    costo_activacion=data.get('costo_activacion')
    sql = 'insert into bonos (nombre_bono, porcentaje, tipo, costo_activacion) values (%s, %s, %s, %s)'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql, (nombre, porcentaje, tipo, costo_activacion))
            current_app.conexion.commit()
            return jsonify({'message': 'Bono agregado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error', 'error al agregar bono'}), 500

@modulo_bonos.route('/eliminarBonos', methods=['POST'])
def eliminar_bonos():
    data = request.json()
    sql = 'delete from bonos where id=%s'
    id_bono = data.get('id_bono')
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql, (id_bono))
            current_app.conexion.commit()
            return jsonify({'mensaje': 'bono eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': 'error al eliminar el bono'})
        

def modificar_bonos():
    data=request.json()
    nombre= data.get('nombre_bono')
    porcentaje=data.get('porcentaje')
    tipo=data.get('tipo')
    costo_activacion=data.get('costo_activacion')
    sql='update bonos set nombre_bono=%s, porcentaje=%s, tipo=%s, costo_activacion=%s where id_bono=%s '
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql, (nombre, porcentaje, tipo, costo_activacion))
            current_app.conexion.commit()   
            return jsonify({'mensaje': 'bono modificado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error', 'error al modificar el bono'})

