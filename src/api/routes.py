"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import random
from flask import Flask, request, jsonify, url_for, Blueprint, redirect, g, render_template
import requests
from urllib.parse import quote

from api.models import db, Users, Tracks, Playlists, Favourites
from api.utils import generate_sitemap, APIException
from api.spotifyApi import SpotifyAPI

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

#  Client Keys
CLIENT_ID = "644ceddb45c84fbaa56651b0f952de2a"
CLIENT_SECRET = "f951c5d97b004f60a23d350f8e23dc6e"


@api.route('/hello')
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


spotify_api = SpotifyAPI(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)



@api.route("/spotify/random")
def get_random_list_of_songs():
    token = spotify_api.get_access_token()
    random_list = spotify_api.get_random_list()
    tracks = random_list["tracks"]
    converted_tracks = list(map(spotify_api.transform_tracks, tracks))

    return jsonify({"data": converted_tracks}), 201

@api.route("/spotify/random/q", methods=["POST"])
def get_list_of_songs_query_based():
    token = spotify_api.get_access_token()
    # get the query from the request
    query = request.json
    searchDict = {"track": query["title"]}
    # create a random offset number
    itemsFound = spotify_api.search(searchDict)["tracks"]["total"]
    if itemsFound < 20:
         return jsonify({"msg": "Get a better keyword. We cannot even find 20 songs!"}), 400
    randomOffset = random.randint(0, itemsFound - 20)
    # the real deal random list based on random offset
    random_queried_list = spotify_api.search(searchDict, "track", randomOffset)
    # creating the response object
    url = random_queried_list["tracks"]["href"]
    itemsFound = random_queried_list["tracks"]["total"]
    tracks = random_queried_list["tracks"]["items"]
    converted_tracks = list(map(spotify_api.transform_tracks, tracks))
    response = {
        "metadata": {
            "url": url,
            "tracksFound": itemsFound,
            "offset": randomOffset
        },
        "tracks": converted_tracks}
    
    return jsonify(response), 201



# route to check if the user exists and is authenticated
@api.route("/user/favourite/track", methods=["GET"])
@jwt_required()
def get_user_favourite_tracks():
    # Access the identity of the current user with get_jwt_identity
    user_username = get_jwt_identity()
    user = Users.query.filter_by(username=user_username).first()

    return jsonify(user.serialize()), 200

@api.route("/favourite/track", methods=["POST"])
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



@api.route("/favourite/track/test", methods=["POST"])
def testing_things():
    print(request.json.keys())
    mandatory_request_keys = ['spotify_id', 'title', 'artist', 'album', 'image_url', 'duration_ms']
    if not all(key in request.json.keys() for key in mandatory_request_keys):
        answer = "uepa"
    else:
        answer = "present"

    return f'<h1>{answer}</h1>'
