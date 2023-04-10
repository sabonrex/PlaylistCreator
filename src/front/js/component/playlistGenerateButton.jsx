import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const RandomPlaylistGenerate = () => {
    const { actions } = useContext(Context);

    const fetchPlaylist = () => actions.fetchPlaylist();

    return (
        <button className="discover-button my-5" onClick={fetchPlaylist}>
          Discover your Playlist
        </button>
    )
};