from flask import Blueprint, render_template, request, redirect, url_for, session, current_app,jsonify
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

historial_bp = Blueprint('historial_bp', __name__)

@historial_bp.route('/historialfinanciero')
def mostrar_historialfinanciero():
    usuario = obtener_usuario_actual()
    
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    
    connection = current_app.config['MYSQL_CONNECTION']
    cursor = connection.cursor()

    try:
        cursor.execute("""
            SELECT * FROM (
                SELECT 
                    'Retiro' AS tipo,
                    u.nombre_usuario AS usuario,
                    NULL AS receptor,
                    r.fecha AS fecha,  # Cambié fecha_retiro por fecha
                    r.monto
                FROM retiros r
                JOIN usuarios u ON r.id_usuario = u.id_usuario  # Asumiendo que la relación es por id_usuario
                UNION ALL
                SELECT 
                    'Transacción' AS tipo,
                    t.nombre_usuario_emisor AS usuario,
                    t.nombre_usuario_receptor AS receptor,
                    t.fecha_transaccion AS fecha,
                    t.monto
                FROM transacciones t
            ) AS historial
            ORDER BY fecha DESC
        """)
        historial = cursor.fetchall()
        return render_template('User/personal/historialfinanciero.html', user=usuario, historial=historial)

    except Exception as e:
        import traceback
        print("Error al consultar historial:", e)
        traceback.print_exc()
        return "Error al mostrar el historial", 500

    finally:
        cursor.close()