import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { EmbeddedSpotify } from "../component/embeddedSpotifyTrack.jsx";

import "../../styles/index.css";

export const MainView = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();
  const spotifyTrackId = actions.getSpotifyTrack();

  return (
    <div className="container text-center py-4 my-4">
      <h1 className="jumbo-text my-5">
        Find Your{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h1>
      <button className="discover-button my-5" onClick={fetchPlaylist}>
        Discover your Playlist
      </button>
      <EmbeddedSpotify spotidyId={spotifyTrackId}/>
    </div>
  );
};

const SavePlaylistButton = () => {
  const { store } = useContext(Context);
  return (
    <Button
      onClick={() => {
        console.log("Saving playlist");
        console.log(store.randomPlaylist);
      }}
    >
      Save
    </Button>
  );
};