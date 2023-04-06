from flask_sqlalchemy import SQLAlchemy

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

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "user_id": self.id,
            "username": self.username,
            "email": self.email,
            "spotify_token": self.spotify_token,
            # "token_expires_at": self.token_expires_at
        }

# tracks DataTable. More attributes to be added to classify the songs according to spotify if needed
class Tracks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    spotify_id = db.Column(db.String(40), unique=True, nullable=False)
    title = db.Column(db.String(250), unique=False, nullable=False)
    artist = db.Column(db.String(250), unique=False, nullable=False)
    album = db.Column(db.String(120), unique=False, nullable=False)
    image_url = db.Column(db.String(500), unique=True, nullable=False)
    duration_ms = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Track {self.title} - {self.artist}>'

    def serialize(self):
        return {
            "track_id": self.id,
            "spotify_id": self.spotify_id,
            "title": self.title,
            "artist": self.artist,
            "album": self.album,
            "duration_ms": self.length,
            "image_url": self.image_url
        }

# playlists DataTable to save some generated random list
class Playlists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))

    def __repr__(self):
        return f'<Playlist {self.id}>'

    def serialize(self):
        return {
            "playlist_id": self.id,
            "user_id": self.user_id,
            "track_id": self.track_id
        }
    # define a method to select a playlist

# favourites DataTable to save favourite tracks and playlists


"""
class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(
        'playlists.id'), nullable=True)

    def __repr__(self):
        return f'<Favourite {self.id}>'

    def serialize(self):
        return {
            "favourite_id": self.id,
            "user_id": self.user_id,
            "track_id": self.track_id,
            "playlist_id": self.playlist_id
        }
    
"""


class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(
        'playlists.id'), nullable=True)

    def __repr__(self):
        return f'<Favourite {self.id}>'

    def serialize(self):
        return {
            "favourite_id": self.id,
            "user_id": self.user_id,
            "track_id": self.track_id,
            "playlist_id": self.playlist_id
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
        return cls.query.filter_by(id=favourite_id).first()

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
