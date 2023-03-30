import React, { useState, useContext } from "react";

import { CarouselFooter } from "../component/carouselFooter.jsx";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";
import { playlist } from "../component/testDataAlbuns";

import "../../styles/index.css";

const BACKEND_URL = process.env.BACKEND_URL;

export const MainView = () => {
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = () => actions.fetchPlaylist();

  return (
    <section className="h-100 w-100 py-5" style={{ backgroundColor: "#1D2343" }}>
      <div className="container text-center py-5 my-5">
        <h1 className="jumbo-text my-5">
          Find Your{" "}
          <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
        </h1>
        <button className="discover-button my-5" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
      </div>
      <CarouselFooter tracks={store.randomPlaylist} />
    </>
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