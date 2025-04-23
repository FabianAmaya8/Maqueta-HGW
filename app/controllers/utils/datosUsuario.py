from flask import session, redirect, url_for, current_app

def obtener_usuario_actual():
    user_id = session.get('user_id')

    if not user_id:
        return redirect(url_for('user_bp.login'))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            # Obtener datos del usuario y su membresía
            cursor.execute("""
                SELECT * FROM usuarios
                JOIN membresias ON usuarios.membresia = membresias.id_membresia
                WHERE id_usuario = %s
            """, (user_id,))
            user = cursor.fetchone()
            if not user:
                return "Usuario no encontrado"

            # Obtener cantidad total de productos en el carrito
            cursor.execute("""
                SELECT COALESCE(SUM(pc.cantidad_producto), 0) AS total_carrito
                FROM carrito_compras c
                JOIN productos_carrito pc ON c.id_carrito = pc.carrito
                WHERE c.id_usuario = %s
            """, (user_id,))
            carrito = cursor.fetchone()
            total_carrito = carrito['total_carrito'] if carrito else 0

            # Agregar la cantidad al diccionario del usuario
            user['total_carrito'] = total_carrito

            return user

    except Exception as e:
        return str(e)
