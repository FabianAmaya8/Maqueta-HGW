from flask import Blueprint, render_template

view_bp = Blueprint('view_bp', __name__)

@view_bp.route('/')
def Home():
    return render_template('./View/index.html')
