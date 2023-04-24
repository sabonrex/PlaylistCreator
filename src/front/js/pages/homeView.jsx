import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { SaveFavouriteButton } from "../component/saveFavouriteButton.jsx";
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
        <button className="discover-button my-5" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
        <AuthComponent>
          <SaveFavouriteButton />
        </AuthComponent>
        <EmbeddedSpotify trackId={store.nowPlaying}/>
      </div>
    </>
  );
};

