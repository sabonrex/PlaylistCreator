import React, { useContext } from "react";

import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist.js";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const Favourites = () => {
  const { actions } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <div className="container text-center py-4 my-4">
      <h2 className="jumbo-text my-4" style={{fontWeight: "calc(3rem + 2.5vw)"}}>
        Your Favourite{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h2>
      <Playlists playlist={playlistData} />
      <button className="discover-button my-5" onClick={fetchPlaylist}>
        Discover your Playlist
      </button>
    </div>
  );
};