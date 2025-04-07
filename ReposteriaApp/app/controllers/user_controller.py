#vamos a definir la lógica para el registro, login y perfil, utilizando consultas SQL manuales. Este código se conecta directamente a la base de datos y ejecuta consultas SQL para el login, registro, y el perfil de usuario.
from flask import Blueprint, render_template, request, redirect, url_for, current_app
from flask_bcrypt import Bcrypt
from flask import session
import os
from werkzeug.utils import secure_filename


user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()


@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        connection = current_app.connection
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, password, role_id FROM usuarios WHERE email=%s", (email,))
                result = cursor.fetchone()
                if result and bcrypt.check_password_hash(result['password'], password):
                    session['user_id'] = result['id']  # Guardar el ID del usuario en la sesión
                    session['user_role'] = result['role_id']  # Guardar el rol del usuario en la sesión
                    return redirect(url_for('user_bp.dashboard'))  # Redirigir al dashboard
                else:
                    return "Login Failed"
        except Exception as e:
            return str(e)

    return render_template('login.html')

@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']

        # Inicializa file_path como None
        file_path = None

        # Obtener el archivo del formulario
        photo = request.files.get('photo')
        if photo and photo.filename:
            print(f"Archivo recibido: {photo.filename}")
            # Guardar la imagen en 'static/uploads/profile_pictures'
            images_dir = os.path.join(current_app.root_path, 'static/uploads/profile_pictures')
            os.makedirs(images_dir, exist_ok=True)

            # Guardar la imagen de forma segura
            filename = secure_filename(photo.filename)
            file_path = os.path.join('uploads/profile_pictures', filename)  # Guardar la ruta relativa
            file_path = file_path.replace("\\", "/") 
            photo.save(os.path.join(images_dir, filename))
            print(f"Guardando imagen en: {file_path}")
        else:
            print("No se recibió ningún archivo.")

        # Guardar en la base de datos
        connection = current_app.connection
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO usuarios (name, email, password, role_id, profile_picture) VALUES (%s, %s, %s, %s, %s)",
                (name, email, bcrypt.generate_password_hash(password).decode('utf-8'), role, file_path)
            )
            connection.commit()

        return redirect(url_for('user_bp.login'))

    # Obtener roles para el formulario de registro
    connection = current_app.connection
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM roles")
        roles = cursor.fetchall()

    return render_template('register.html', roles=roles)


@user_bp.route('/dashboard')
def dashboard():
    # Redirigir al usuario a su página según el rol
    role_id = session.get('user_role')

    if role_id == 1:  # Administrador
        return redirect(url_for('admin_bp.admin_dashboard'))
    elif role_id == 2:  # Vendedor
        return redirect(url_for('seller_bp.seller_dashboard'))
    elif role_id == 3:  # Repostero
        return redirect(url_for('baker_bp.baker_dashboard'))
    else:
        return "Invalid Role"

@user_bp.route('/profile')
def profile():
    user_id = session.get('user_id')
    if not user_id:
        return redirect(url_for('user_bp.login'))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT name, email, role_id FROM usuarios WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            if not user:
                return "User not found"
    except Exception as e:
        return str(e)

    return render_template('profile.html', user=user)

@user_bp.route('/logout')
def logout():
    # Limpiar la sesión y redirigir al login
    session.clear()
    return render_template('home.html')
    #return redirect(url_for('user_bp.login'))