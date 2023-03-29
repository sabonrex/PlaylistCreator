import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";

import "../../styles/index.css";

export const MainView = () => {
  const { store } = useContext(Context);
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async () => {
    const apiUrl = store.apiUrl + "randomlist/";
    console.log(apiUrl)
    const request = {
      method: "GET",
      cors: "no-cors"
    }
    
    const resp = await fetch(apiUrl, request);
    console.log(resp)
    const readableResp = await resp.json();
    console.log(readableResp)
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
