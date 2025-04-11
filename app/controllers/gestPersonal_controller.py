from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os


gestPersonal_bp = Blueprint('gestPersonal_bp', __name__)

@gestPersonal_bp.route('/personal')
def gestPersonal():
    return render_template('./User/personal/personal.html')
