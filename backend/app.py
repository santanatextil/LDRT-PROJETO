from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
jwt = JWTManager(app)
db = SQLAlchemy(app)

class Disease(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10))
    name = db.Column(db.String(200))
    cid = db.Column(db.String(10))
    category = db.Column(db.String(50))

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    diseases = Disease.query.all()
    return jsonify([{'code': d.code, 'name': d.name, 'cid': d.cid, 'category': d.category} for d in diseases])

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username == "admin" and password == "senha123":
        access_token = create_access_token(identity="admin")
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Invalid credentials"}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)