from flask_sqlalchemy import SQLAlchemy

from api.utils import APIException

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

db = SQLAlchemy()


# users DataTable with info about spotify token to use in future features
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # ask Edgar why is this possibly necessary?
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    spotify_token = db.Column(db.String(500), unique=False)
    # token_created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    # token_expires_at = db.Column(db.DateTime(), default=datetime.utcnow)
    favourite = db.relationship("Favourites", uselist=False, back_populates="user")

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "user_id": self.id,
            "username": self.username,
            "email": self.email,
            # "spotify_token": self.spotify_token,
            # "token_expires_at": self.token_expires_at
        }

    # Here we should add password encrypton or inside Users Model

    @classmethod
    def create(cls, password, username=None, email=None):
        user = cls()
        if username == None and email == None:
            raise APIException("You must provide at least a username or an email")

        user.username="temporary username" if username == None else username
        user.email = "temporary@email" if email == None else email
        user.password = password
        user.is_active = True

        db.session.add(user)
        db.session.commit()

        if username == None: user.update_username(f'User{user.id}')
        if email == None: user.update_email(f'User{user.id}@email.com')
        Favourites.initialize(user.id)

        return user
    
    def update_username(self, new_username):
        self.username = new_username
        db.session.add(self)
        db.session.commit()

    def update_email(self, new_email):
        self.email = new_email
        db.session.add(self)
        db.session.commit()

    def read_by_username(username):
        return Users.query.filter_by(username=username).first()

    @jwt_required()
    def get_auth_user():
        username = get_jwt_identity()
        return Users.read_by_username(username=username)



# relational table to create many-to-many relationship between Tracks and Playlists
playlist_tracks = db.Table('playlist_tracks',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('track_id', db.Integer, db.ForeignKey('tracks.id'), primary_key=True)
)



# relational table to create many-to-many relationship between Tracks and Favourites
favourite_tracks = db.Table('favourite_tracks',
    db.Column('favourite_id', db.Integer, db.ForeignKey('favourites.id'), primary_key=True),
    db.Column('track_id', db.Integer, db.ForeignKey('tracks.id'), primary_key=True)



)# relational table to create many-to-many relationship between Playlists and Favourites
favourite_playlists = db.Table('favourite_playlists',
    db.Column('favourite_id', db.Integer, db.ForeignKey('favourites.id'), primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
)



# tracks DataTable. More attributes to be added to classify the songs according to spotify if needed
class Tracks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    spotify_id = db.Column(db.String(40), unique=True, nullable=False)
    title = db.Column(db.String(250), unique=False, nullable=False)
    artist = db.Column(db.String(250), unique=False, nullable=False)
    album = db.Column(db.String(120), unique=False, nullable=False)
    image_url = db.Column(db.String(500), unique=False, nullable=False)
    duration_ms = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Track {self.title} - {self.artist}>'

    def serialize(self):
        return {
            "id": self.id,
            "spotify_id": self.spotify_id,
            "title": self.title,
            "artist": self.artist,
            "album": self.album,
            "duration_ms": self.duration_ms,
            "image_url": self.image_url
        }
    
    @classmethod
    def tracks_len(cls):
        number_of_tracks = cls.query.count()
        return number_of_tracks

    @classmethod
    def read_all(cls, limit=10, offset=0):
        return cls.query.limit(limit).offset(offset).all()

    @classmethod
    def read(cls, id):
        return cls.query.get_or_404(id)
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def check_request(json_request):
        mandatory_request_keys = ['spotify_id', 'title', 'artist', 'album', 'image_url', 'duration_ms']
        if not all(key in json_request.keys() for key in mandatory_request_keys):
            return False
        else:
            return True
    
    @classmethod
    def create(cls, spotify_id, title, artist, album, image_url, duration_ms):
        new_track = cls()
        new_track.spotify_id = spotify_id
        new_track.title = title
        new_track.artist = artist
        new_track.album = album
        new_track.image_url = image_url
        new_track.duration_ms = duration_ms

        db.session.add(new_track)
        db.session.commit()

        return new_track



# playlists DataTable to save some generated random list
class Playlists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    tracks = db.relationship('Tracks', secondary=playlist_tracks, backref='playlists')

    def __repr__(self):
        return f'<Playlist {self.name}>'
    """
    # Trying to initialize with the random name here instead of create method
    def __init__(self):
        self.name = f'Random Playlist {self.id}'
    """
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "tracks": list(map(lambda track: track.serialize(), self.tracks))
        }

    @classmethod
    def read_all(cls, limit=10, offset=0):
        return cls.query.limit(limit).offset(offset).all()

    @classmethod
    def read(cls, id):
        return cls.query.get_or_404(id)
    
    def rename(self, new_name):
        playlist = Playlists.query.get_or_404(self.id)
        playlist.name = new_name
        db.session.add(playlist)
        db.session.commit()
        return playlist.name
    
    @classmethod
    def create(cls):
        new_playlist = cls()
        new_playlist.name = f'New Playlist'
        db.session.add(new_playlist)
        db.session.commit()
        new_playlist.rename(f'Random Playlist {new_playlist.id}')
        return new_playlist

    def serialize_tracks(self):
        return list(map(lambda track: track.serialize(), self.tracks))

    #check if track exists to use before removing track
    def track_exists(self, track_id):
        tracks = self.tracks
        if len(tracks) == 0: return False
        for track in tracks:
            if track.id == track_id:
                return True
        return False

    def append_track(self, track_id):
        track = Tracks.query.get_or_404(track_id) #it will throw an error if track does not exist
        self.tracks.append(track)
        db.session.add(self)
        db.session.commit()
        return self.serialize_tracks()

    def remove_track(self, track_id):
        track = Tracks.query.get_or_404(track_id)        
        if not self.track_exists(track_id): 
            raise APIException("This track is not in this Playlist")
        self.tracks.remove(track)
        db.session.commit()
        return self.serialize_tracks()

    def delete(self):
        db.session.delete(self)
        db.session.commit()



# favourites DataTable to save favourite tracks and playlists
class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("Users", back_populates="favourite")
    tracks = db.relationship('Tracks', secondary=favourite_tracks, backref='favourites')
    playlists = db.relationship('Playlists', secondary=favourite_playlists, backref='favourites')

    def __repr__(self):
        return f'<User {self.user.username} favourites>'

    def serialize(self):
        return {
            "favourite_id": self.id,
            "user_id": self.user_id,
            "tracks": list(map(lambda track: track.serialize(), self.tracks)),
            "playlists": list(map(lambda playlist: playlist.serialize(), self.playlists))
        }

    @classmethod
    def create(cls, user_id, track_id=None, playlist_id=None):
        favourite = cls(user_id=user_id, track_id=track_id,
                        playlist_id=playlist_id)
        db.session.add(favourite)
        db.session.commit()
        return favourite

    @classmethod
    def read(cls, favourite_id):
        return cls.query.get_or_404(favourite_id)

    def read_tracks(self):
        return self.serialize_tracks()

    def read_playlists(self):
        return self.serialize_playlists()

    def serialize_tracks(self):
        return list(map(lambda track: track.serialize(), self.tracks))
    
    def serialize_playlists(self):
        return list(map(lambda playlist: playlist.serialize(), self.playlists))
    
    def append_track(self, track_id):
        track = Tracks.read(track_id)
        self.tracks.append(track)
        db.session.add(self)
        db.session.commit()
        return self.serialize_tracks()

    def append_playlist(self, playlist_id):
        playlist = Playlists.read(playlist_id)
        self.playlists.append(playlist)
        db.session.add(self)
        db.session.commit()
        return self.serialize_playlists()
    
    def track_exists(self, track_id):
        tracks = self.tracks
        if len(tracks) == 0: return False
        for track in tracks:
            if track.id == track_id:
                return True
        return False
    
    def playlist_exists(self, playlist_id):
        playlists = self.playlists
        if len(playlists) == 0: return False
        for playlist in playlists:
            if playlist.id == playlist_id:
                return True
        return False

    def remove_track(self, track_id):
        track = Tracks.query.get_or_404(track_id)
        if not self.track_exists(track_id): 
            raise APIException("This track is not in user Favourites")
        self.tracks.remove(track)
        db.session.commit()
        return self.serialize_tracks()

    def remove_playlist(self, playlist_id):
        playlist = Playlists.query.get_or_404(playlist_id)
        if not self.playlist_exists(playlist_id): 
            raise APIException("This playlist is not in user Favourites")
        self.playlists.remove(playlist)
        db.session.commit()
        return self.serialize_playlists()

    def update(self, track_id=None, playlist_id=None):
        self.track_id = track_id
        self.playlist_id = playlist_id
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def get_user_favorites(cls,user_id):
        # do something here
        favorites = cls.query.filter_by(user_id=user_id)
        return favorites
