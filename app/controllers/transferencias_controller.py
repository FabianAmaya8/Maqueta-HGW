from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from .utils.datosUsuario import obtener_usuario_actual

transferencias_bp = Blueprint('transferencias_bp', __name__)

# Mostrar la vista de transferencias
@transferencias_bp.route('/transferencias')
def mostrar_transferencias():
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario
    
    nombre_usuario = usuario['nombre_usuario']

    connection = current_app.config['MYSQL_CONNECTION']
    cursor = connection.cursor()

    # Consultar las transferencias relacionadas con el usuario (como emisor o receptor)
    cursor.execute("""
        SELECT nombre_usuario_emisor, nombre_usuario_receptor, fecha_transaccion, monto
        FROM transacciones
        ORDER BY fecha_transaccion DESC
    """)

   
    transacciones = cursor.fetchall()

    # Renderizar el template con el historial de transacciones
    return render_template('User/personal/transferencias.html', user=usuario, transacciones=transacciones)


# Registrar nueva transferencia
@transferencias_bp.route('/registrar-transferencia', methods=['POST'])
def registrar_transferencia():
    connection = current_app.config['MYSQL_CONNECTION']
    cursor = connection.cursor()

    usuario = obtener_usuario_actual()
    nombre_usuario_emisor = usuario['nombre_usuario']

    nombre_usuario_receptor = request.form['nombre_usuario_receptor']
    monto = request.form['monto']
    descripcion = request.form.get('descripcion', '')

    try:
        cursor.execute("""
            INSERT INTO transacciones (nombre_usuario_emisor, nombre_usuario_receptor, monto, descripcion)
            VALUES (%s, %s, %s, %s)
        """, (nombre_usuario_emisor, nombre_usuario_receptor, monto, descripcion))
        connection.commit()
        return redirect(url_for('transferencias_bp.mostrar_transferencias'))
    except Exception as e:
        print("Error:", e)
        connection.rollback()
        return "Error al registrar la transferencia", 500
    finally:
        cursor.close()

