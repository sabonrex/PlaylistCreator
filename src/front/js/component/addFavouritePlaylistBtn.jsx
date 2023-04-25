import React, { useContext } from "react";

import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const AddFavouritePlaylistButton = () => {
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
    )}