from flask import jsonify, Blueprint

from api.favourites_model import db, FavouritesTest
from api.models import Users, Tracks, Playlists, Favourites


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


favourites_api = Blueprint('favourites_api', __name__)

# GET route to get all user favourites. Both tracks and playlist (everything in one json)
@favourites_api.route("", methods=["GET"])
def get_user_favourites():
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# GET route to get all user favourites tracks
@favourites_api.route("/tracks", methods=["GET"])
@jwt_required()
def get_user_favourite_tracks():
    # Access the identity of the current user with get_jwt_identity
    user_username = get_jwt_identity()
    user = Users.query.filter_by(username=user_username).first()

    return jsonify(user.serialize()), 200

# GET route to get all user favourite playlists
@favourites_api.route("/playlists", methods=["GET"])
@jwt_required()
def get_user_favourite_playlists():
    # Access the identity of the current user with get_jwt_identity
    user_username = get_jwt_identity()
    user = Users.query.filter_by(username=user_username).first()

    return jsonify(user.serialize()), 200

# POST route to add a new track to user favourites
@favourites_api.route("/tracks/add", methods=["POST"])
@jwt_required()
def add_favourite_track():
    # Access the identity of the current user with get_jwt_identity
    user_username = get_jwt_identity()
    user = Users.query.filter_by(username=user_username).first()

    # Check if request has at least the spotify id
    spotify_id = request.json.get("spotify_id",None)
    if spotify_id == None:
         return jsonify({"msg": "There is no spotify_id field"}), 400
    
    # Check if track exists in database
    track = Tracks.query.filter_by(spotify_id=spotify_id).first()
    if track == None:

        # mandatory keys in request in the case it is not in the DB
        mandatory_request_keys = ['spotify_id', 'title', 'artist', 'album', 'image_url', 'duration_ms']
        if not all(key in request.json.keys() for key in mandatory_request_keys):
            return jsonify({"msg": "There is a missing mandatory field in the request"}), 400
        # creating a new track in DB    
        new_track = Tracks()
        new_track.spotify_id = request.json.get("spotify_id")
        new_track.title = request.json.get("title")
        new_track.artist = request.json.get("artist")
        new_track.album = request.json.get("album")
        new_track.image_url = request.json.get("image_url")
        new_track.duration_ms = request.json.get("duration_ms")
        track = new_track
        db.session.add(new_track)
        db.session.commit()

    # Create and populate new favourite instance
    favourite = Favourites.create(user_id=user.id, track_id=track.id)
    
    response = {"msg": f'New Favourite added to <User {user.username}>'}

    return jsonify(response), 201


# POST route to add a new playlist to user favourites
@favourites_api.route("/playlists/add", methods=["GET"])
def add_favourite_playlist():
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# DELETE route to remove a track from favourites
@favourites_api.route("/tracks/remove", methods=["GET"])
def remove_track():
    response = {"msg": "Still working on it"}
    return jsonify(response), 200

# DELETE route to remove a playlist from favourites
@favourites_api.route("/playlists/remove", methods=["GET"])
def remove_playlist():
    response = {"msg": "Still working on it"}
    return jsonify(response), 200


@favourites_api.route("/testPost", methods=["POST"])
def testing_things():
    print(request.json.keys())
    mandatory_request_keys = ['spotify_id', 'title', 'artist', 'album', 'image_url', 'duration_ms']
    if not all(key in request.json.keys() for key in mandatory_request_keys):
        answer = "uepa"
    else:
        answer = "present"

    return f'<h1>{answer}</h1>'
