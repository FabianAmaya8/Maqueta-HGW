from flask import Blueprint, render_template, session, redirect, url_for, current_app

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/admin/dashboard')
def admin_dashboard():
    # Obtener el ID del usuario (administrador) de la sesión
    user_id = session.get('user_id')

    if not user_id:
        # Si no hay usuario en la sesión, redirigir al login
        return redirect(url_for('user_bp.login'))

    # Conectar a la base de datos para obtener la información del administrador
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Obtener la información del usuario (administrador)
            cursor.execute("SELECT id, name, email, profile_picture FROM usuarios WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            if not user:
                return "Administrador no encontrado"

            # Otras estadísticas (conteos para el dashboard)
            cursor.execute("SELECT COUNT(*) AS user_count FROM usuarios")
            user_count = cursor.fetchone()['user_count']

            cursor.execute("SELECT COUNT(*) AS category_count FROM categories")
            category_count = cursor.fetchone()['category_count']

            cursor.execute("SELECT COUNT(*) AS product_count FROM products")
            product_count = cursor.fetchone()['product_count']

    except Exception as e:
        return str(e)

    # Renderizar la plantilla y pasar la información del usuario (administrador)
    return render_template('admin_dashboard.html', user=user, user_count=user_count, category_count=category_count, product_count=product_count)


