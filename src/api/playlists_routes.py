from flask import jsonify, Blueprint

from api.models import db, Playlists


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


playlists_api = Blueprint('playlists_api', __name__)

# GET route to get all playlists available in the DB or a sample of them. Not important for most features
@playlists_api.route("", methods=["GET"])
def get_all_playlists():
    playlists = Playlists.query.limit(20).all()

    response = {
        "msg": "Still working on it"
    }

    return jsonify(response), 200

# GET route to get a playlist based on the ID from the DB. Not important at the moment
@playlists_api.route("/id", methods=["GET"])
def get_playlist():
    playlists = Playlists.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# POST route to add new playlist to the DB
@playlists_api.route("/add", methods=["GET"])
def add_playlist():
    playlists = Playlists.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# DELETE route to remove a playlist from the DB
@playlists_api.route("/remove", methods=["GET"])
def remove_playlist():
    playlists = Playlists.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# PUT route to move a track from one playlist to another (change the playlist id in track id)
@playlists_api.route("/track/move", methods=["GET"])
def move_playlist():
    playlists = Playlists.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200