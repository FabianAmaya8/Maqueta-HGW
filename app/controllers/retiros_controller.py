from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

retiros_bp = Blueprint('retiros_bp', __name__)

@retiros_bp.route('/retiros', methods=['GET', 'POST'])
def mostrar_retiros():
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario

    if request.method == 'POST':
        try:
            id_usuario = usuario['id_usuario']
            saldo = request.form['saldo']
            banco = request.form['banco']
            cuenta = request.form['cuenta']
            retiro = request.form['retiro']

            connection = current_app.config['MYSQL_CONNECTION']
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO retiros (id_usuario, saldo_disponible, banco, numero_cuenta_celular, monto_retiro)
                    VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (id_usuario, saldo, banco, cuenta, retiro))
                connection.commit()

            return redirect(url_for('retiros_bp.mostrar_retiros'))

        except Exception as e:
            return f"Error al procesar la solicitud: {e}"

    return render_template('/User/personal/retiros.html', user=usuario)
