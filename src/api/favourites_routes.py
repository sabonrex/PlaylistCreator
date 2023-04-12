from flask import jsonify, request, Blueprint

from api.models import db, Favourites, Users


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

favourites_api = Blueprint('favourites_api', __name__)


# GET route to get all user favourites. Both tracks and playlist (everything in one json)
@favourites_api.route("", methods=["GET"])
def get_user_favourites():
    user = Users.get_auth_user()
    # getting the user tracks and favourites HERE
    if user.favourite == None: Favourites.initialize(user_id=user.id)
    
    favourite_tracks = user.favourite.read_tracks()
    favourite_playlists = user.favourite.read_playlists()
    
    response = {
        "tracks": favourite_tracks,
        "playlists": favourite_playlists
    }
    
    return jsonify(response), 200


# GET route to get all user favourites tracks
@favourites_api.route("/tracks", methods=["GET"])
def get_user_favourite_tracks():
    user = Users.get_auth_user()
    # in case an old user was not correctly initialized with a favourite list
    if user.favourite == None: Favourites.initialize(user_id=user.id)

    favourite_tracks = user.favourite.read_tracks()
    
    return jsonify(favourite_tracks), 200


# GET route to get all user favourite playlists
@favourites_api.route("/playlists", methods=["GET"])
def get_user_favourite_playlists():
    user = Users.get_auth_user()
    # getting the user tracks and favourites HERE
    if user.favourite == None: Favourites.initialize(user_id=user.id)

    favourite_playlists = user.favourite.read_playlists()
    
    return jsonify(favourite_playlists), 200


# POST route to add a new track to user favourites
@favourites_api.route("/tracks/<int:track_id>", methods=["POST"])
def add_new_favourite_track(track_id):
    user = Users.get_auth_user()
    favourites = user.favourite
    favourite_tracks = favourites.append_track(track_id)

    response = {
        "msg": "Track added successfully",
        "tracks": favourite_tracks
    }

    return jsonify(response)


# POST route to add a new playlist to user favourites
@favourites_api.route("/playlists/<int:playlist_id>", methods=["POST"])
def add_new_favourite_playlist(playlist_id):
    user = Users.get_auth_user()
    favourites = user.favourite
    favourite_playlists = favourites.append_playlist(playlist_id)

    response = {
        "msg": "Playlist added successfully",
        "playlists": favourite_playlists
    }

    return jsonify(response)


# DELETE route to remove a track from user favourites
@favourites_api.route("/tracks/<int:track_id>", methods=["DELETE"])
def remove_favourite_track(track_id):
    user = Users.get_auth_user()
    favourites = user.favourite
    favourite_tracks = favourites.remove_track(track_id)

    response = {
        "msg": "Track removed successfully",
        "tracks": favourite_tracks
    }

    return jsonify(response)


# DELETE route to remove a playlist from user favourites
@favourites_api.route("/playlists/<int:playlist_id>", methods=["DELETE"])
def remove_favourite_playlist(playlist_id):
    user = Users.get_auth_user()
    favourites = user.favourite
    favourite_playlists = favourites.remove_playlist(playlist_id)

    response = {
        "msg": "Playlist removed successfully",
        "playlists": favourite_playlists
    }

    return jsonify(response)
