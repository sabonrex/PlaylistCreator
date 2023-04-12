import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { SaveFavouriteButton } from "../component/saveFavouriteButton.jsx";
import { RandomPlaylistGenerate } from "../component/playlistGenerateButton.jsx";
import { EmbeddedSpotify } from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";
import { AuthComponent } from "../auth/authComponent.jsx";

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
        
        <RandomPlaylistGenerate />

        <AuthComponent>
          <SaveFavouriteButton />
        </AuthComponent>

        <EmbeddedSpotify spotifyId={spotifyTrackId}/>
      </div>
    </>
  );
};

