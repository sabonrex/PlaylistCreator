"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import random
from flask import Flask, request, jsonify, url_for, Blueprint, redirect, g, render_template
import requests
from urllib.parse import quote
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Tracks, Playlists, Favourites
from api.utils import generate_sitemap, APIException
from api.auth import SpotifyAPI


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


@api.route('/hello')
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


#  Client Keys
CLIENT_ID = "644ceddb45c84fbaa56651b0f952de2a"
CLIENT_SECRET = "f951c5d97b004f60a23d350f8e23dc6e"

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
CLIENT_SIDE_URL = "https://3001-sabonrex-playlistcreato-mkniel1kd1y.ws-eu92.gitpod.io/api"
# PORT = 3001
REDIRECT_URI = "{}/callback/q".format(CLIENT_SIDE_URL)
REDIRECT_RANDOM_LIST_URI = "{}/randomlistcallback/q".format(CLIENT_SIDE_URL)
SCOPE = "playlist-modify-public playlist-modify-private"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID
}

spotify_api = SpotifyAPI(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)


@api.route("/randomlist/")
def request_auth():
    # Auth Step 1: Authorization
    auth_query_parameters["redirect_uri"] = REDIRECT_RANDOM_LIST_URI
    url_args = "&".join(["{}={}".format(key, quote(val))
                        for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@api.route("/randomlistcallback/q")
def randomlist_callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_RANDOM_LIST_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    # Generate random list from a seed song
    random_list_request = "https://api.spotify.com/v1/recommendations?seed_artists=6WH1V41LwGDGmlPUhSZLHO&seed_genres=electronic&seed_tracks=33zDGjUK3BiqgFxoIpUWLy"
    list_response = requests.get(
        random_list_request, headers=authorization_header)
    random_list_data = json.loads(list_response.text)

    return f"<p>{random_list_data}</p>"


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


@api.route("/spotifyauth/")
def index():
    # Auth Step 1: Authorization
    auth_query_parameters["redirect_uri"] = REDIRECT_URI
    url_args = "&".join(["{}={}".format(key, quote(val))
                        for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@api.route("/callback/q")
def callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    # Get profile data
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(
        user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)

    # Get user playlist data
    playlist_api_endpoint = "{}/playlists".format(profile_data["href"])
    playlists_response = requests.get(
        playlist_api_endpoint, headers=authorization_header)
    playlist_data = json.loads(playlists_response.text)

    return f"<p>Successful auth</p>"

    # Combine profile and playlist data to display
    # display_arr = [profile_data] + playlist_data["items"]
    # return render_template("index.html", sorted_array=display_arr)


if __name__ == "__main__":
    api.run(debug=True, port=PORT)

# route to signup a user and add it to the database


@api.route("/signup", methods=["POST"])
def add_user():
    user = Users()

    request_user = request.json

    user.username = request_user["username"]
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
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(username=username).first()

    if user is None:
         return jsonify({"msg": "The user does not exist"}), 401

    if password != user.password:
        return jsonify({"msg": "The password doesn't match"}), 403

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 201


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
def add_favourit_track():
    # Access the identity of the current user with get_jwt_identity
    user_username = get_jwt_identity()
    user = Users.query.filter_by(username=user_username).first()

    # Check if track exists in database
    track_id = request.json.get("track_id", None)
    spotify_id = request.json.get("spotify_id",None)
    track = Tracks.query.filter_by(spotify_id=spotify_id).first()
    if track == None:
        new_track = Tracks()
        track.spotify_id = request.json.get("spotify_id", None)
        track.title = request.json.get("title", None)
        track.artist = request.json.get("artist", None)
        track.album = request.json.get("album", None)
        track.image_url = request.json.get("image_url", None)
        track.duration_ms = request.json.get("duration_ms", None)
        db.session.add(new_track)

    # Create and populate new favourite instance
    favourite = Favourites()
    favourite.user_id = user.id
    favourite.track_id = request.json.get("track_id")
    
    # Insert new favourite track in database
    db.session.add(favourite)
    db.session.commit()

    response = {
        "msg": f'New Favourite added to <User {user.username}>'
    }

    return jsonify(response), 201