import React, { useState } from "react";

import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";

import "../../styles/index.css";

const BACKEND_URL = process.env.BACKEND_URL;

export const MainView = () => {
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/spotify/random`);
      if (!response.ok) throw new Error("Something went wrong");
      const jsonResponse = await response.json();
      setPlaylist(jsonResponse?.data || []);
    } catch {
      window.alert("Something went wrong");
    }
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
      {playlist &&
        playlist.map((track) => {
          return (
            <li key={track.id}>
              {Object.values(track).map((value) => (
                <ul style={{ color: "white" }} key={value}>
                  {value}
                </ul>
              ))}
            </li>
          );
        })}
    </section>
  );
};
