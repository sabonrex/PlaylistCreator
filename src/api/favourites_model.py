from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class FavouritesTest(db.Model):
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
