import React, { useContext } from "react";

import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const SaveFavouriteButton = () => {
    const { store, actions } = useContext(Context);
    
    const handleClick = () => {
      if (store.currentPlaylistSaved) {
        alert("Already saved this playlist!")
      }
      else if (store.randomPlaylist.length == 0) {
        alert("Generate a new playlist first!")
      } else {
        actions.saveRandomPlaylist(),
        actions.setSavedPlaylist(true)}
    }

    return (
      <Button
        onClick={() => handleClick()}
      >
        Save this playlist
      </Button>
    )}