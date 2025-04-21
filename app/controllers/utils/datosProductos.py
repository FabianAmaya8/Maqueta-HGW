from flask import current_app

def obtener_productos(limit=10):
    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT p.id_producto, c.nombre_categoria AS categoria, 
                        p.nombre_producto AS nombre, p.precio_producto AS precio, 
                        p.imagen_producto AS imagen, p.stock
                FROM productos p
                JOIN categorias c ON p.categoria = c.id_categoria
                ORDER BY RAND()
                LIMIT %s
            """, (limit,))
            productos = cursor.fetchall()
            return productos
    except Exception as e:
        return str(e)
