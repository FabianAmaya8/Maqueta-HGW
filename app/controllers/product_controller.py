# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/personal')
def personal():
    return render_template('User/personal/personal.html')
