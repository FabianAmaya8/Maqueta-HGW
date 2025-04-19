from flask import Flask, render_template, send_from_directory, Blueprint

menu = Blueprint("menu", __name__)

@menu.route('/Admin')
def home():
    return render_template('admin.html')

@menu.route('/static/admin/js/<path:filename>')
def custom_js(filename):
    return send_from_directory('static/admin/js', filename, mimetype='application/javascript')
