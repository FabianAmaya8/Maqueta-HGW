from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

infoPersonal_bp = Blueprint('infoPersonal_bp', __name__)

@infoPersonal_bp.route('/Informacion-Personal')
def infoPersonal():
    connection = current_app.connection

    # Datos básicos del usuario actual
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario

    try:
        with connection.cursor() as cursor:
            # Datos personales + membresía + medio de pago + dirección + ciudad + país
            cursor.execute("""
                SELECT 
                    u.id_usuario, u.nombre, u.apellido, u.nombre_usuario, u.correo_electronico, 
                    u.numero_telefono, u.url_foto_perfil, u.patrocinador, u.rol,
                    m.nombre_membresia,
                    mp.nombre_medio,
                    d.direccion, d.codigo_postal, d.lugar_entrega,
                    ciudad.nombre AS ciudad,
                    pais.nombre AS pais
                FROM usuarios u
                LEFT JOIN membresias m ON u.membresia = m.id_membresia
                LEFT JOIN medios_pago mp ON u.medio_pago = mp.id_medio
                LEFT JOIN direcciones d ON u.id_usuario = d.id_usuario
                LEFT JOIN ubicaciones ciudad ON d.id_ubicacion = ciudad.id_ubicacion
                LEFT JOIN ubicaciones pais ON ciudad.ubicacion_padre = pais.id_ubicacion
                WHERE u.id_usuario = %s
                LIMIT 1
            """, (usuario['id_usuario'],))

            datos_completos = cursor.fetchone()

            if datos_completos:
                return render_template('User/personal/info-personal.html', user=datos_completos)
            else:
                return "No se encontraron detalles personales para este usuario."

    except Exception as e:
        return f"Error al cargar la información personal: {str(e)}"


@infoPersonal_bp.route('/actualizarInfoPersonal', methods=['POST'])
def actualizar_info_personal():
    connection = current_app.connection
    usuario = obtener_usuario_actual()
    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario

    try:
        data = request.form
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE usuarios SET
                nombre=%s, apellido=%s, nombre_usuario=%s, correo_electronico=%s,
                numero_telefono=%s, patrocinador=%s
                WHERE id_usuario = %s
            """, (
                data.get('nombre'), data.get('apellido'), data.get('nombre_usuario'),
                data.get('correo_electronico'), data.get('numero_telefono'),
                data.get('patrocinador'), usuario['id_usuario']
            ))

            cursor.execute("""
                UPDATE direcciones SET
                direccion=%s, codigo_postal=%s, lugar_entrega=%s
                WHERE id_usuario = %s
            """, (
                data.get('direccion'), data.get('codigo_postal'), data.get('lugar_entrega'), usuario['id_usuario']
            ))

        connection.commit()
        return redirect(url_for('infoPersonal_bp.infoPersonal'))

    except Exception as e:
        return f"Error al actualizar información: {str(e)}"
