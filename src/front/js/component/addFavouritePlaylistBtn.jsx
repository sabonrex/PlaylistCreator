import React, { useContext } from "react";

import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const AddFavouritePlaylistButton = () => {
    const { store } = useContext(Context);

    if (store.randomPlaylist.length == 0) return null;

    const handleClick = () => {
      console.log("Saving playlist");
      console.log(store.randomPlaylist);
    }

    return (
      <button className="fav-playlist-button my-3" onClick={handleClick} >
        Do you like it? Save it!
      </button>
    )}