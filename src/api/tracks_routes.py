from flask import jsonify, request, url_for, Blueprint

from api.models import db, Tracks


from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


tracks_api = Blueprint('tracks_api', __name__)

# GET route to read all tracks available with limit and offset
@tracks_api.route("", methods=["GET"])
def get_all_tracks():
    # number of tracks that exist in DB
    number_of_tracks = Tracks.tracks_len()
    # getting the limit and offset from the url request
    limit = request.args.get('limit', 10, type=int)
    if limit > 100: limit = 100
    offset = request.args.get('offset', 0, type=int)
    if offset > number_of_tracks: offset = number_of_tracks - limit
    # querying DB to get the tracks
    tracks = Tracks.read_all(limit=limit, offset=offset)
    tracks_list = list(map(lambda track: track.serialize(), tracks))
    # defining the prev and next "page"
    if offset == 0: 
        prev = None
    elif offset < limit:
        prev = url_for('tracks_api.get_all_tracks', limit=limit, offset=0)
    else:
        prev = url_for('tracks_api.get_all_tracks', limit=limit, offset=offset-limit)
    if offset > number_of_tracks - limit:
        next = None
    else:
        next = url_for('tracks_api.get_all_tracks', limit=limit, offset=offset+limit)

    response = {
        "total": number_of_tracks,
        "prev": prev,
        "next": next,
        "tracks": tracks_list
    }

    return jsonify(response), 200
    

# GET route to get a track based on the ID from the DB
@tracks_api.route("/<int:id>", methods=["GET"])
def get_track(id):
    track = Tracks.query.get_or_404(id)
    return jsonify(track.serialize()), 200


# POST route to add a new track to the DB
@tracks_api.route("/", methods=["POST"])
def add_track():
    # check mandatory keys in request
    if not Tracks.check_request(request.json):
        return jsonify({"msg": "There is a missing mandatory field in the request"}), 400
    # get the parameters from the request
    json_request = request.json 
    spotify_id = json_request.get("spotify_id")
    title = json_request.get("title")
    artist = json_request.get("artist")
    artist_spotify_id = json_request.get("artist_spotify_id")
    album = json_request.get("album")
    image_url = json_request.get("image_url")
    image_thumb_url = json_request.get("image_thumb_url")
    duration_ms = json_request.get("duration_ms")
    # create new track using class method
    track = Tracks.create(spotify_id, title, artist, artist_spotify_id, album, image_url, image_thumb_url, duration_ms)
    
    response = {
        "msg": "New track created successfully",
        "location_url": url_for('tracks_api.get_track', id=track.id),
        }
        
    return jsonify(response), 201


# DELETE route to delete a track from the DB
@tracks_api.route("/<int:id>", methods=["DELETE"])
def remove_track(id):
    track = Tracks.query.get(id)
    if track == None:
        return jsonify({"msg": f'Track {id} not found'}), 404

    track.delete()
    response = {"msg": f'Track {id} was successfully deleted'}
    return jsonify(response), 200