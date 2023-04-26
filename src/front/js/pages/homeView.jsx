import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { AddFavouritePlaylistButton } from "../component/addFavouritePlaylistBtn.jsx";
import EmbeddedSpotify from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";
import { AuthComponent } from "../auth/authComponent.jsx";

export const MainView = () => {
  const { store, actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <>
      <div className="container text-center py-4 my-4">
        <h1 className="jumbo-text my-5">
          Find Your{" "}
          <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
        </h1>
        <button className="discover-button my-3" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
        <AuthComponent>
          <AddFavouritePlaylistButton />
        </AuthComponent>
        <EmbeddedSpotify trackId={store.nowPlaying}/>
      </div>
    </>
  );
};

