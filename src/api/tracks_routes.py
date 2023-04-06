from flask import jsonify, Blueprint

from api.models import db, Tracks


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


tracks_api = Blueprint('tracks_api', __name__)

# GET route to get all tracks available in the DB or a sample of them
@tracks_api.route("", methods=["GET"])
def get_all_tracks():
    tracks = Tracks.query.limit(20).all()
    
    response = {
        "msg": "Still working on it"
    }

    return jsonify(response), 200

# GET route to get a track based on the ID from the DB
@tracks_api.route("/id", methods=["GET"])
def get_track():
    tracks = Tracks.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# POST route to add a new track to the DB
@tracks_api.route("/add", methods=["GET"])
def add_track():
    tracks = Tracks.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# DELETE route to delete a track from the DB
@tracks_api.route("/remove", methods=["GET"])
def remove_track():
    tracks = Tracks.query.first()
    response = {"msg": "Still working on it"}
    return jsonify(response), 200