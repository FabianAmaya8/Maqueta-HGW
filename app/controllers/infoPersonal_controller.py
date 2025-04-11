from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os

infoPersonal_bp = Blueprint('infoPersonal_bp', __name__)

@infoPersonal_bp.route('/infoPersonal')
def infoPersonal():
    return render_template('User/personal/info-personal.html')