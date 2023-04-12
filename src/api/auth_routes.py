from flask import jsonify, request, Blueprint

from api.models import db, Users


from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

auth = Blueprint('auth', __name__)

# route to signup a user and add it to the database
@auth.route("/signup", methods=["POST"])
def add_user():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    
    password = request.json.get("password", None)
    if password == None: return jsonify({"msg": "Missing password key"})

    new_user = Users.create(password, username=username, email=email)

    response = {
        "msg": "User successfully created",
        "user": new_user.serialize()
    }

    return jsonify(response), 201


# route to check if the user exists and creates is authentication token
@auth.route("/login", methods=["POST"])
def handle_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.read_by_username(username)

    if user is None:
         return jsonify({"msg": "The user does not exist"}), 401

    if password != user.password:
        return jsonify({"msg": "The password doesn't match"}), 403

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 201


# route to check if the user exists and creates is authentication token
@auth.route("/check", methods=["GET"])
def protected_route():
    user = Users.get_auth_user()
    return jsonify(user.serialize()), 200