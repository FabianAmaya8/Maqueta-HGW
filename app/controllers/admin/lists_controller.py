from flask import Blueprint, request, jsonify, current_app
import pymysql

generales = Blueprint('ultimo', __name__)

@generales.route('/consultar_roles', methods=['GET'])
def roles():
    sql='select * from roles'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            roles = cursor.fetchall()
            return jsonify(roles), 200
    except Exception as e:
        return 'error en la consulta de roles'
@generales.route('/consultar_membresias', methods=['GET'])
def membresias():
    sql='select * from membresias'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            mem = cursor.fetchall()
            return jsonify(mem), 200
    except Exception as e:
        return 'error en la consulta de membresias'
@generales.route('/consultar_medios', methods=['GET'])
def medios():
    sql='select * from medios_pago'
    try:
        with current_app.conexion.cursor() as cursor:
            cursor.execute(sql)
            med = cursor.fetchall()
            return jsonify(med), 200
    except Exception as e:
        print(str(e))
        return "Error al consultar bonos"