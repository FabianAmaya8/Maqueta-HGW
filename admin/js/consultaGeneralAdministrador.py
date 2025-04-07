from Flask import Flask
from jsonify import pymysql
sin_existencias={'errorProducto':'no se encuentran existencias'}
coneccion_db=get_db_connection()
falla_coneccion="sin coneccion a base de datos"

def consultarProductos():
    if coneccion_db:
        try:
            cursor=coneccion_db.cursor()
            cursor.execute('SELECT * FROM productos')
        except pymysql.MYSQLError as err:
            return falla_coneccion
        finally:
            cursor.close()
            coneccion_db.close()
            return None
    
def consultarCategorias():
    if coneccion_db:
        try:
            cursor=coneccion_db.cursor()
            cursor.execute('SELECT * FROM categorias')
        except pymysql.MYSQLError as err:
            return falla_coneccion
        finally:
            cursor.close
            coneccion_db.close()
            return None
        
def consultarSubcategorias():
    if coneccion_db:
        try:
            cursor=coneccion_db.cursor()
            cursor.execute('SELECT * FROM subcategorias')
        except pymysql.MYSQLError as err:
            return falla_coneccion
        finally:
            cursor.close
            coneccion_db.close()
            return None
        



@app.route('/', METHODS=['GET'])
def obtenerProductos():
    productos=consultarProductos()
    if productos:
        return jsonify()
    else:
        return jsonify(sin_existencias)
    
def obtenerCategorias():
    categorias=consultarCategorias()
    if categorias:
        return jsonify()
    else:
        return jsonify(sin_existencias)

def obtenerSubcategorias():
    subcategorias=consultarSubcategorias()
    if subcategorias:
        return jsonify()
    else:
        return jsonify(sin_existencias)