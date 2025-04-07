from flask import flask, request, jsonify
import pymysql
from datetime import datetime

conexion=conexion_db()

def guardarMensaje(id_conversacion, usuario, mensaje):
    if conexion:
        try:
            with conexion.cursor() as cursor:
                query="insert into mensajes (id_conversacion, usuario, mensaje, timetamp) values (%s, %s, %s, %s)"
            cursor.execute(query, (id_conversacion, usuario, mensaje, datetime.now()))
            conexion.commit()
        finally:
            conexion.close()
            return None

def procesarMensaje(mensaje):
    if 'hola' in mensaje.lower:
        return 'hola ¿en que puedo ayudarte?'
    else:
        return 'no estoy seguro en como responder esto'


def recibirMensaje():
    datos = request.json()
    id_conversacion = datos.get('id_conversacion')
    mensajeUsuario = datos.get('mensaje')
    guardarMensaje(id_conversacion, 'usuario', mensajeUsuario)
    respuesta=procesarMensaje()
    guardarMensaje(id_conversacion, 'bot')
    return jsonify({'respuesta':respuesta})