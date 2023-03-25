"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Tracks, Playlists, Favourites
from api.utils import generate_sitemap, APIException


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# route to signup a user and add it to the database
@api.route("/signup", methods=["POST"])
def add_user():
    user = Users()

    request_user = request.json

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
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(email=email).first()

    if password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# route to check if the user exists and is authenticated
@api.route("/check", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_email = get_jwt_identity()
    user = Users.query.filter_by(email=current_email).first()

    return jsonify(user.serialize()), 200