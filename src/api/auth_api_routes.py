from flask import jsonify, request, Blueprint

from api.models import db, Users

from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

auth_api = Blueprint('auth', __name__)

# route to signup a user and add it to the database
@auth_api.route("/signup", methods=["POST"])
def add_user():
    user = Users()
    
    request_user = request.json

    user.username = request_user["username"]
    user.email = request.json.get("email", None)
    user.password = request_user["password"]

    # Here we should add password encrypton

    user.is_active = True

    db.session.add(user)
    db.session.commit()

    response = {
        "msg": "User successfully created"
    }

    return jsonify(response), 201


# route to check if the user exists and creates is authentication token
@auth_api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(username=username).first()

    if user is None:
         return jsonify({"msg": "The user does not exist"}), 401

    if password != user.password:
        return jsonify({"msg": "The password doesn't match"}), 403

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 201