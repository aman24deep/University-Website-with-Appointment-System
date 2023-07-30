from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
import MySQLdb.cursors

# app password for gmail account - fwzarhmnznkgdhtg

app = Flask(__name__)       # initializing flask object
app.secret_key = 'rvscet'


@app.route('/')
def home():
    return render_template("./index.html")



if __name__ == '__main__':
    app.run(debug=True, port=7000)