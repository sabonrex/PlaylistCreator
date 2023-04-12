import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { Favourites } from "../component/favouriteSelect.jsx";
import { AuthPage } from "../auth/authPage.jsx";
import { RandomPlaylistGenerate } from "../component/playlistGenerateButton.jsx";

import "../../styles/index.css";

export const FavouritesView = () => {
  return (
    <AuthPage>
      <FavouritesPage />
    </AuthPage>
  );
}

export const FavouritesPage = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <div className="container text-center py-4 my-4">
      <h2 className="jumbo-text my-4" style={{fontWeight: "calc(3rem + 2.5vw)"}}>
        Your Favourite{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h2>
      <RandomPlaylistGenerate />
      <Playlists />
      <Favourites />
      <button className="discover-button my-5" onClick={fetchPlaylist}>
        Discover your Playlist
      </button>
    </div>
  );
};