from flask import Flask, Blueprint, current_app, request, jsonify

modulo_producto = Blueprint("modulo_producto", __name__)

@modulo_producto.route("/registro_producto", methods = ["POST"])
def registro_producto():
    if(request):
        datos = request.get_json()
        nombre_p = datos.get("Nombre Producto")
        precio_p = datos.get("Precio Producto")
        descripcion = datos.get("Descripción")
        categoria = datos.get("Categoria")
        try:
            with current_app.conexion.cursor() as cursor:
                sql = "INSERT INTO productos(categoria, nombre_producto, precio_producto, descripcion) VALUES(%s, %s, %s, %s)"
                cursor.execute(sql, (categoria, nombre_p, precio_p, descripcion))
                current_app.conexion.commit()
                return "se ha registrado correctamente el producto"
        except Exception as error:
            return "ha ocurrido un error en el registro: \n"+str(error)