import React, { useContext } from "react";

import { CarouselFooter } from "../component/carouselFooter.jsx";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const MainView = () => {
  const { store, actions } = useContext(Context);

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