from flask import jsonify, request, url_for, Blueprint

from api.models import db, Playlists


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


playlists_api = Blueprint('playlists_api', __name__)


# GET route to get all playlists available in the DB or a sample of them. Not important for most features
# this route is probably not important. We need to get specific user favourites playlists
@playlists_api.route("", methods=["GET"])
def get_all_playlists():
    playlists = Playlists.query.limit(20).all()
    playlists_list = list(map(lambda playlist: playlist.serialize(), playlists))
    return jsonify(playlists_list), 200


# GET route to get a playlist based on the ID from the DB. Not important at the moment
@playlists_api.route("/<int:id>", methods=["GET"])
def get_playlist(id):
    playlist = Playlists.read(id)
    return jsonify(playlist.serialize()), 200


# POST route to add new empty playlist to the DB
@playlists_api.route("/", methods=["POST"])
def create_empty_playlist():
    new_playlist = Playlists.create()
    
    response = {
        "msg": "New playlist created successfully",
        "playlist_id": new_playlist.id,
        "location_url": url_for('playlists_api.get_playlist', id=new_playlist.id),
        }

    return jsonify(response), 201


# DELETE route to remove a playlist from the DB
@playlists_api.route("/<int:id>", methods=["DELETE"])
def remove_playlist(id):
    playlist = Playlists.read(id)
    playlist.delete()
    return jsonify({"msg": f'Playlist {id} was successfully deleted'}), 200


# GET playlist tracks
@playlists_api.route("/<int:id>/tracks", methods=["GET"])
def get_all_tracks(id):
    playlist = Playlists.read(id)
    tracks = playlist.get_serialized_tracks()
    return jsonify(tracks), 200


# POST route to add new track into a playlist
@playlists_api.route("/<int:playlist_id>/tracks/<int:track_id>", methods=["POST"])
def append_track_to_playlist(playlist_id, track_id):
    playlist = Playlists.read(playlist_id)
    tracks = playlist.append_track(track_id)
    
    response = {
        "msg": "Track added successfully",
        "tracks": tracks
        }
    return jsonify(response), 201


# POST route to add new track into a playlist (same as above, diff method)
@playlists_api.route("/addtrack", methods=["POST"])
def append_track_with_request():
    playlist_id = request.json.get("playlist_id", None)
    if playlist_id == None: return jsonify({"msg": "Missing playlist_id"})
    
    track_id = request.json.get("track_id", None)
    if track_id == None: return jsonify({"msg": "Missing track_id"})

    return append_track_to_playlist(playlist_id, track_id)
    

# DELETE route to remove a track from a playlist
@playlists_api.route("/<int:playlist_id>/tracks/<int:track_id>", methods=["DELETE"])
def remove_track_from_playlist(playlist_id, track_id):
    playlist = Playlists.read(playlist_id)
    tracks = playlist.remove_track(track_id)

    if tracks == None:
        return jsonify({"msg": "The playlist does not contain this track"})
    
    response = {
        "msg": "Track removed successfully",
        "tracks": tracks
        }

    return jsonify(response), 200


# DELETE route to remove a track from a playlist (same as above, diff method)
@playlists_api.route("/removetrack", methods=["DELETE"])
def remove_track_from_playlist_with_request():
    playlist_id = request.json.get("playlist_id", None)
    if playlist_id == None: return jsonify({"msg": "Missing playlist_id"})
    
    track_id = request.json.get("track_id", None)
    if track_id == None: return jsonify({"msg": "Missing track_id"})

    return remove_track_from_playlist(playlist_id, track_id)


# PUT route to move a track from one playlist to another (change the playlist id in track id)
@playlists_api.route("/<int:origin_id>/tracks/<int:track_id>/playlists/<int:destiny_id>/move", methods=["PUT"])
def move_playlist(origin_id, track_id, destiny_id):

    origin_playlist = Playlists.read(origin_id)
    destiny_playlist = Playlists.read(destiny_id)

    origin_tracks = origin_playlist.remove_track(track_id)
    if origin_tracks == None: 
        return jsonify({"msg": "The origin playlist does not contain this track"})
    
    destiny_playlist = Playlists.read(destiny_id)
    destiny_tracks = destiny_playlist.append_track(track_id)

    response = {
        "msg": f'Track moved from Playlist {origin_id} to Playlist {destiny_id}',
        "origin_tracks": origin_tracks,
        "destiny_tracks": destiny_tracks
    }
    
    return jsonify(response), 200


# PUT route to move a track from one playlist to another (change the playlist id in track id)
@playlists_api.route("/move", methods=["PUT"])
def move_playlist_with_request():
    origin_playlist_id = request.json.get("origin_playlist_id", None)
    if origin_playlist_id == None: return jsonify({"msg": "Missing origin_playlist_id"})
    
    destiny_playlist_id = request.json.get("destiny_playlist_id", None)
    if destiny_playlist_id == None: return jsonify({"msg": "Missing destiny_playlist_id"})

    track_id = request.json.get("track_id", None)
    if track_id == None: return jsonify({"msg": "Missing track_id"})
    
    return move_playlist(origin_playlist_id, track_id, destiny_playlist_id)


# PUT route to rename a playlist
@playlists_api.route("/rename", methods=["PUT"])
def rename_playlist():
    id = request.json.get("id", None)
    if id == None: return jsonify({"msg": "Missing id"})

    new_name = request.json.get("new_name", None)
    if new_name == None: return jsonify({"msg": "Missing new_name"})

    playlist = Playlists.read(id)
    new_name = playlist.rename(new_name)

    response = {
        "msg": "Playlist name changed successfully",
        "new_name": new_name
        }

    return jsonify(response), 200