from flask import Flask, render_template, Blueprint

menu = Blueprint("menu", __name__)

@menu.route("/home")
def home():
    return render_template("index.html")