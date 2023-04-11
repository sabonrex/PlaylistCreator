import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { Favourites } from "../component/favouriteSelect.jsx";
import { RandomPlaylistGenerate } from "../component/playlistGenerateButton.jsx";
import { EmbeddedSpotify } from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";

export const FavouritesView = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <div className="container text-center my-2">

      <h2 className="jumbo-text my-4" style={{fontWeight: "calc(2rem + 1.5vw)"}}>
        Your Favourite{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h2>
      
      <div className="fav_viewport">
        <Playlists />
        <Favourites />
      </div>
    </div>
  );
};