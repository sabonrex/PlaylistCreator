import React, { useState } from "react";

import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";

import "../../styles/index.css";

export const MainView = () => {
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = () => {
    console.log("vai po caralho");
  };

  return (
    <section
      className="h-100 w-100 py-5"
      style={{ backgroundColor: "#1D2343" }}
    >
      <div className="container text-center py-5 my-5">
        <h1 className="jumbo-text my-5">
          Find Your{" "}
          <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
        </h1>
        <button className="discover-button my-5" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
      </div>
      <Playlists playlist={playlistData} />
    </section>
  );
};
