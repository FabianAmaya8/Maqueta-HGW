from flask import Blueprint, render_template, request, redirect, url_for, current_app, flash
from flask_bcrypt import Bcrypt
import os
from werkzeug.utils import secure_filename

user_management_bp = Blueprint('user_management_bp', __name__)
bcrypt = Bcrypt()

@user_management_bp.route('/manage_users')
def manage_users():
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Obtener todos los usuarios
            cursor.execute("SELECT u.name, u.email, r.role_name FROM usuarios u JOIN roles r ON u.role_id = r.id")
            users = cursor.fetchall()
    except Exception as e:
        return str(e)

    return render_template('manage_users.html', users=users)

@user_management_bp.route('/delete_user/<email>', methods=['POST'])
def delete_user(email):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM usuarios WHERE email=%s", (email,))
            connection.commit()
            flash('Usuario eliminado exitosamente', 'success')
    except Exception as e:
        flash('Error al eliminar el usuario: ' + str(e), 'danger')

    return redirect(url_for('user_management_bp.manage_users'))

@user_management_bp.route('/edit_user/<email>', methods=['GET', 'POST'])
def edit_user(email):
    connection = current_app.connection
    if request.method == 'POST':
        name = request.form['name']
        new_email = request.form['email']
        role_id = request.form['role']

        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE usuarios SET name=%s, email=%s, role_id=%s WHERE email=%s",
                    (name, new_email, role_id, email)
                )
                connection.commit()
                flash('Usuario modificado exitosamente', 'success')
        except Exception as e:
            flash('Error al modificar el usuario: ' + str(e), 'danger')

        return redirect(url_for('user_management_bp.manage_users'))

    # Obtener datos del usuario
    with connection.cursor() as cursor:
        cursor.execute("SELECT name, email, role_id FROM usuarios WHERE email=%s", (email,))
        user = cursor.fetchone()

    # Obtener roles para el formulario de edición
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM roles")
        roles = cursor.fetchall()

    return render_template('edit_user.html', user=user, roles=roles)

@user_management_bp.route('/create_user', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role_id = request.form['role']

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

        connection = current_app.connection
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO usuarios (name, email, password, role_id, profile_picture) VALUES (%s, %s, %s, %s, %s)",
                    (name, email, bcrypt.generate_password_hash(password).decode('utf-8'), role_id, file_path)
                )
                connection.commit()
                flash('Usuario creado exitosamente', 'success')
        except Exception as e:
            flash('Error al crear el usuario: ' + str(e), 'danger')

        return redirect(url_for('user_management_bp.manage_users'))

    # Obtener roles para el formulario de creación
    connection = current_app.connection
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM roles")
        roles = cursor.fetchall()

    return render_template('create_user.html', roles=roles)
