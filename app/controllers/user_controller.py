from flask import Blueprint, render_template, request, redirect, url_for, session, current_app,jsonify
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
from .utils.datosUsuario import obtener_usuario_actual

# Crear blueprint
user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()

@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('View/login.html')

    if request.method == 'POST':
        # Asegurarse de que los datos vengan como JSON
        if request.is_json:
            data = request.get_json()
            email = data.get('email') or data.get('usuario')
            password = data.get('password') or data.get('contrasena')
        else:
            return jsonify(success=False, message='Formato de datos no válido'), 400

        connection = current_app.connection
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT id_usuario AS id, pss AS password, rol AS role_id 
                    FROM usuarios 
                    WHERE correo_electronico = %s OR nombre_usuario = %s
                """, (email, email))
                result = cursor.fetchone()

                if result and bcrypt.check_password_hash(result['password'], password):
                    session['user_id'] = result['id']
                    session['user_role'] = result['role_id']

                    role_redirects = {
                        1: '/Admin',
                        2: '/mod',
                        3: '/inicio'
                    }

                    return jsonify(success=True, redirect=role_redirects.get(result['role_id'], '/inicion'))

                else:
                    return jsonify(success=False, message="El usuario o la contraseña son incorrectos.")

        except Exception as e:
            return jsonify(success=False, message="Error de servidor: " + str(e)), 500



# REGISTRO
@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    connection = current_app.connection

    if request.method == 'POST':
        print("Se recibió una petición POST en /register")
        print("Datos del formulario:", request.form)
        print("Archivos enviados:", request.files)

        try:
            nombre = request.form['nombres']
            apellido = request.form['apellido']
            nombre_usuario = request.form['usuario']
            contrasena = request.form['contrasena']
            confirmar_contrasena = request.form['confirmar_contrasena']
            correo = request.form['correo']
            telefono = request.form['telefono']
            patrocinador = request.form['patrocinador']
            membresia = 1
            medio_pago = 1
            direccion = request.form['direccion']
            codigo_postal = request.form['codigo_postal']
            ubicacion = int(request.form['ciudad'])
            lugar_entrega = request.form['lugar_entrega']

            if contrasena != confirmar_contrasena:
                return "Las contraseñas no coinciden."

            hashed_password = bcrypt.generate_password_hash(contrasena).decode('utf-8')

            foto = request.files.get('foto_perfil')
            ruta_foto = None
            if foto and foto.filename:
                filename = secure_filename(nombre_usuario + os.path.splitext(foto.filename)[1])
                ruta_relativa = os.path.join('uploads/profile_pictures', filename)
                ruta_absoluta = os.path.join(current_app.root_path, 'static', ruta_relativa)
                os.makedirs(os.path.dirname(ruta_absoluta), exist_ok=True)
                foto.save(ruta_absoluta)
                ruta_foto = ruta_relativa.replace("\\", "/")

            with connection.cursor() as cursor:
                # Insertar usuario
                cursor.execute("""
                    INSERT INTO usuarios 
                    (nombre, apellido, nombre_usuario, pss, correo_electronico, 
                    numero_telefono, url_foto_perfil, patrocinador, membresia, medio_pago, rol)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (nombre, apellido, nombre_usuario, hashed_password, correo,
                        telefono, ruta_foto, patrocinador, membresia, medio_pago, 3))

                id_usuario = cursor.lastrowid

                # Insertar dirección
                cursor.execute("""
                    INSERT INTO direcciones 
                    (id_usuario, direccion, codigo_postal, id_ubicacion, lugar_entrega)
                    VALUES (%s, %s, %s, %s, %s)
                """, (id_usuario, direccion, codigo_postal, ubicacion, lugar_entrega))

                # Crear carrito para el usuario
                cursor.execute("""
                    INSERT INTO carrito_compras (id_usuario)
                    VALUES (%s)
                """, (id_usuario,))

                connection.commit()

            return redirect(url_for('user_bp.login'))

        except Exception as e:
            print("Error durante el registro:", str(e))
            return f"Error durante el registro: {str(e)}"

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id_membresia, nombre_membresia FROM membresias")
            membresias = cursor.fetchall()

            cursor.execute("SELECT id_medio, nombre_medio FROM medios_pago")
            medios_pago = cursor.fetchall()

            cursor.execute("SELECT id_ubicacion, nombre FROM ubicaciones WHERE tipo = 'pais'")
            paises = cursor.fetchall()

            cursor.execute("SELECT id_ubicacion, nombre, ubicacion_padre FROM ubicaciones WHERE tipo = 'ciudad'")
            ciudades = cursor.fetchall()

    except Exception as e:
        return f"Error cargando datos del formulario: {str(e)}"

    return render_template("View/registro.html",
                            membresias=membresias,
                            medios_pago=medios_pago,
                            paises=paises,
                            ciudades=ciudades)


# INICIO
@user_bp.route('/inicio')
def inicio():

    #Datos del usuario
    usuario = obtener_usuario_actual()

    if isinstance(usuario, str) or hasattr(usuario, 'status_code'):
        return usuario

    return render_template('User/inicio.html', user=usuario)
