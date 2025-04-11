from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from werkzeug.utils import secure_filename
from flask_bcrypt import Bcrypt
import os

gesUsers_bp = Blueprint('gesUsers_bp', __name__)
bcrypt = Bcrypt()

UPLOAD_FOLDER = 'uploads/profile_pictures'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 📋 Listar usuarios
@gesUsers_bp.route('/gestion-usuarios')
def gesUsers():
    connection = current_app.connection
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("""
                SELECT u.*, r.nombre_rol, m.nombre_membresia, mp.nombre_medio
                FROM usuarios u
                JOIN roles r ON u.rol = r.id_rol
                JOIN membresias m ON u.membresia = m.id_membresia
                LEFT JOIN medios_pago mp ON u.medio_pago = mp.id_medio
            """)
            usuarios = cursor.fetchall()
        return render_template('admin/gestion/GestionUsuarios.html', usuarios=usuarios)
    except Exception as e:
        return f"Error al obtener usuarios: {str(e)}"

# ➕ Crear nuevo usuario
@gesUsers_bp.route('/crear-usuario', methods=['GET', 'POST'])
def crear_usuario():
    connection = current_app.connection

    if request.method == 'POST':
        try:
            nombre = request.form['nombre']
            apellido = request.form['apellido']
            nombre_usuario = request.form['usuario']
            contrasena = request.form['contrasena']
            correo = request.form['correo']
            telefono = request.form['telefono']
            patrocinador = request.form.get('patrocinador', None)
            membresia = request.form.get('membresia', 1)
            medio_pago = request.form.get('medio_pago', None)
            rol_id = request.form.get('rol_id', 3)

            direccion = request.form['direccion']
            codigo_postal = request.form.get('codigo_postal', None)
            id_ubicacion = request.form['id_ubicacion']
            lugar_entrega = request.form.get('lugar_entrega', 'Casa')

            hashed_password = bcrypt.generate_password_hash(contrasena).decode('utf-8')

            foto = request.files.get('foto')
            ruta_foto = None
            if foto and allowed_file(foto.filename):
                filename = secure_filename(nombre_usuario + os.path.splitext(foto.filename)[1])
                ruta_relativa = os.path.join(UPLOAD_FOLDER, filename)
                ruta_absoluta = os.path.join(current_app.root_path, 'static', ruta_relativa)
                os.makedirs(os.path.dirname(ruta_absoluta), exist_ok=True)
                foto.save(ruta_absoluta)
                ruta_foto = ruta_relativa.replace("\\", "/")

            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO usuarios (nombre, apellido, nombre_usuario, pss, correo_electronico, 
                    numero_telefono, url_foto_perfil, patrocinador, membresia, medio_pago, rol)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (nombre, apellido, nombre_usuario, hashed_password, correo,
                      telefono, ruta_foto, patrocinador, membresia, medio_pago, rol_id))

                id_usuario = cursor.lastrowid

                cursor.execute("""
                    INSERT INTO direcciones (id_usuario, direccion, codigo_postal, id_ubicacion, lugar_entrega)
                    VALUES (%s, %s, %s, %s, %s)
                """, (id_usuario, direccion, codigo_postal, id_ubicacion, lugar_entrega))

                connection.commit()
                flash("Usuario creado correctamente", "success")
                return redirect(url_for('gesUsers_bp.gesUsers'))

        except Exception as e:
            return f"Error al crear usuario: {str(e)}"

    # GET: obtener datos para los selects
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT id_rol, nombre_rol FROM roles")
            roles = cursor.fetchall()

            cursor.execute("SELECT id_membresia, nombre_membresia FROM membresias")
            membresias = cursor.fetchall()

            cursor.execute("SELECT id_medio, nombre_medio FROM medios_pago")
            medios_pago = cursor.fetchall()

            cursor.execute("SELECT id_ubicacion, nombre FROM ubicaciones WHERE tipo = 'ciudad'")
            ciudades = cursor.fetchall()

    except Exception as e:
        return f"Error al cargar formulario: {str(e)}"

    return render_template('crear_usuario.html', roles=roles, membresias=membresias, medios_pago=medios_pago, ciudades=ciudades)

# ✏️ Editar usuario
@gesUsers_bp.route('/editar-usuario/<int:id>', methods=['GET', 'POST'])
def editar_usuario(id):
    connection = current_app.connection
    try:
        with connection.cursor(dictionary=True) as cursor:
            if request.method == 'POST':
                nombre = request.form['nombre']
                apellido = request.form['apellido']
                correo = request.form['correo']
                telefono = request.form['telefono']
                rol_id = request.form['rol_id']
                foto = request.files.get('foto')

                ruta_foto = None
                if foto and allowed_file(foto.filename):
                    filename = secure_filename(correo + os.path.splitext(foto.filename)[1])
                    ruta_relativa = os.path.join(UPLOAD_FOLDER, filename)
                    ruta_absoluta = os.path.join(current_app.root_path, 'static', ruta_relativa)
                    os.makedirs(os.path.dirname(ruta_absoluta), exist_ok=True)
                    foto.save(ruta_absoluta)
                    ruta_foto = ruta_relativa.replace("\\", "/")

                cursor.execute("""
                    UPDATE usuarios 
                    SET nombre=%s, apellido=%s, correo_electronico=%s, numero_telefono=%s, rol=%s, url_foto_perfil=%s 
                    WHERE id_usuario=%s
                """, (nombre, apellido, correo, telefono, rol_id, ruta_foto, id))

                connection.commit()
                flash("Usuario actualizado correctamente", "success")
                return redirect(url_for('gesUsers_bp.gesUsers'))

            cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (id,))
            usuario = cursor.fetchone()

            cursor.execute("SELECT id_rol, nombre_rol FROM roles")
            roles = cursor.fetchall()

            return render_template('editar_usuario.html', usuario=usuario, roles=roles)

    except Exception as e:
        return f"Error al editar usuario: {str(e)}"

# 🗑️ Eliminar usuario
@gesUsers_bp.route('/eliminar-usuario/<int:id>', methods=['POST'])
def eliminar_usuario(id):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM usuarios WHERE id_usuario = %s", (id,))
            connection.commit()
            flash("Usuario eliminado correctamente", "success")
    except Exception as e:
        return f"Error al eliminar usuario: {str(e)}"
    return redirect(url_for('gesUsers_bp.gesUsers'))
