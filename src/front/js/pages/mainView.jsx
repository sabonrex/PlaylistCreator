import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";

import "../../styles/index.css";
import { Button } from "react-bootstrap";

export const MainView = () => {
  const { actions, store } = useContext(Context);

  const fetchPlaylist = () => actions.fetchPlaylist();

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
        <SavePlaylistButton />
      </div>
      <Playlists playlist={playlistData} />
      {store.randomPlaylist?.length > 0 &&
        store.randomPlaylist.map((track) => {
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
