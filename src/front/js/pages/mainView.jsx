import React, { useState, useContext } from "react";

import { CarouselFooter } from "../component/carouselFooter.jsx";

import { Context } from "../store/appContext";
import { Playlists } from "../component/playlistSelect.jsx";
import { playlistData } from "../component/testDataPlaylist";
import { playlist } from "../component/testDataAlbuns";

import "../../styles/index.css";
import { Button } from "react-bootstrap";

export const MainView = () => {
  const { actions, store } = useContext(Context);

  const fetchPlaylist = () => {
    actions.fetchPlaylist();
    console.log(store.randomPlaylist)
  }

  return (
    <>
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
