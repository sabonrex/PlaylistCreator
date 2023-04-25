import React, { useContext } from "react";

import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const SaveFavouriteButton = () => {
    const { store, actions } = useContext(Context);
    
    return (
      <Button
        onClick={() => actions.createPlaylist()}
      >
        Save this playlist
      </Button>
    )}