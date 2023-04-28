"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
import requests
import json
import random

from api.models import db, Users, Tracks
from api.utils import APIException
from api.spotifyApi import SpotifyAPI


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

    for track in converted_tracks:
        if Tracks.exist_by_spotify_id(track['spotify_id']):
            existing_track = Tracks.read_by_spotify_id(track['spotify_id'])
            track['track_id'] = existing_track.id
        else:
            new_track = Tracks.create(
                spotify_id=track['spotify_id'], 
                title=track['title'], 
                artist=track['artist'], 
                artist_spotify_id=track['artist_spotify_id'], 
                album=track['album'], 
                image_url=track['image_url'], 
                image_thumb_url=track['image_thumb_url'], 
                duration_ms=track['duration_ms'])
            track['track_id'] = new_track.id
    
    return jsonify(converted_tracks), 201

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

@api.route("/spotify/random/mood", methods=["POST"])
def get_random_songs_mood_based():
    token = spotify_api.get_access_token()
    # code to generate more random layers to our random playlist
    response_body = {
        "message": "Still working on this"
    }
    return jsonify(response_body), 200