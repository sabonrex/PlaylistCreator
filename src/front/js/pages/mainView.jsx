import React, { useContext } from "react";

import { Context } from "../store/appContext";

import "../../styles/index.css";

export const MainView = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <div className="container text-center py-4 my-4">
      <h1 className="jumbo-text my-5">
        Find Your{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h1>
      <button className="discover-button my-5" onClick={fetchPlaylist}>
        Discover your Playlist
      </button>
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