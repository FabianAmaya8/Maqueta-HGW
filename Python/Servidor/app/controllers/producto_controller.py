from flask import Flask, Blueprint, current_app, request, jsonify

modulo_producto = Blueprint("modulo_producto", __name__)

@modulo_producto.route("/registro_producto", methods = ["POST"])
def registro_producto():
    
    return