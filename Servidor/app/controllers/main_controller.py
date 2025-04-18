from flask import Flask, render_template, send_from_directory, Blueprint

menu = Blueprint("menu", __name__)

@menu.route('/')
def home():
    return render_template('index.html')

@menu.route('/static/js/<path:filename>')
def custom_js(filename):
    return send_from_directory('static/js', filename, mimetype='application/javascript')
