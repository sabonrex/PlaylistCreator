
import click
from .models import db, Users, Tracks
from .tracksJson import testTracksData as data

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = Users()
            user.username = "test_user" + str(x)
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        ### Insert the code to populate others tables if needed

    @app.cli.command("insert-tracks") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_tracks(count):

        if int(count) >= 20:
            print("only 20 songs available in json object")
            return None

        print("Populating Test Tracks")
        for x in range(1, int(count) + 1):
            track = Tracks()
            track.spotify_id = data[x]["id"]
            track.title = data[x]["title"]
            track.artist = data[x]["artist"]
            track.album = data[x]["album"]
            track.duration_ms = data[x]["duration_ms"]
            track.image_url = data[x]["image_url"]
            db.session.add(track)
            db.session.commit()
            print("track", data[x]["title"], "added")

        print("All test tracks added")

        ### Insert the code to populate others tables if needed