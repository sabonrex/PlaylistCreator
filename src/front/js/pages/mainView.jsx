import React, { useState } from "react";

import { Playlists } from "../component/playlistSelect";

import "../../styles/index.css";

export const MainView = () => {

  const [playlist, setPlaylist] = useState(null)

  return (
    <section className="h-100 w-100 py-5" style={{"backgroundColor": "#1D2343"}}>
        <div className="container text-center py-5 my-5">
            <h1 className="jumbo-text my-5">Find Your <span style={{"color": "#BAFF4F", "fontWeight": "bold"}}>Music</span></h1>
            <button className="discover-button my-5">Discover your Playlist</button>
        </div>
        <Playlists />
    </section>
  );
};