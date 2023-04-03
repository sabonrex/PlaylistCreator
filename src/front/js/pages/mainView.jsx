import React, { useContext } from "react";

import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";
import { Favourites } from "../component/favouriteSelect.jsx";
import { favouritesData } from "../component/testDataFavourites.js";
import { Button } from "react-bootstrap";

import { Context } from "../store/appContext";
import { SaveFavouriteButton } from "../component/favouriteButton.jsx";
import { EmbeddedSpotify } from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";

export const MainView = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();
  const spotifyTrackId = actions.getSpotifyTrack();

  return (
    <>
      <div className="container text-center py-4 my-4">
        <h1 className="jumbo-text my-5">
          Find Your{" "}
          <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
        </h1>
        <button className="discover-button my-5" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
        <SaveFavouriteButton />
        <EmbeddedSpotify spotidyId={spotifyTrackId}/>
      </div>
    </>
  );
};