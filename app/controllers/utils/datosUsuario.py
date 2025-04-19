from flask import session, redirect, url_for, current_app

def obtener_usuario_actual():
    user_id = session.get('user_id')

    if not user_id:
        return redirect(url_for('user_bp.login'))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM usuarios
                JOIN membresias ON usuarios.membresia = membresias.id_membresia
                WHERE id_usuario = %s
            """, (user_id,))
            user = cursor.fetchone()
            if not user:
                return "Usuario no encontrado"
            return user
    except Exception as e:
        return str(e)
