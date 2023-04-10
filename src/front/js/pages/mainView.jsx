import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { RandomPlaylistGenerate } from "../component/playlistGenerator.jsx";
import { SaveFavouriteButton } from "../component/favouriteButton.jsx";
import { EmbeddedSpotify } from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";

export const MainView = () => {
  const { actions } = useContext(Context);

  const spotifyTrackId = actions.getSpotifyTrack();

  return (
    <>
      <div className="container text-center py-4 my-4">
        <h1 className="jumbo-text my-5">
          Find Your{" "}
          <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
        </h1>

        <RandomPlaylistGenerate />

        <SaveFavouriteButton />
      </div>
    </>
  );
};