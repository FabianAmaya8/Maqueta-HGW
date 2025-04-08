from flask import Flask, request, jsonify, Blueprint, current_app
import pymysql

modulo_referidos = Blueprint("modulo_referidos", __name__)

@modulo_referidos.route("/consultar_referidos", methods=["POST"])
def consultar_referidos():
    id_usuario = 2
    id_referido = 1
    if(id_usuario and id_referido):
        try:
            with current_app.conexion.cursor as cursor:
                sql = "SELECT * FROM grupo WHERE id_usuario = %s and id_referido = %s"
                cursor.execute(sql, (id_usuario, id_referido))
        except Exception as error:
            return "ha ocurrido un error en el registro: \n"+ str(error)