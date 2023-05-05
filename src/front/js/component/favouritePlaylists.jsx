import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { FavouritePlayistsRender } from "./favouritePlaylistsRender.jsx";


export const FavouritePlayists = () => {
    const { store } = useContext(Context);

    return <FavouritePlayistsRender listOfPlaylists={store.favPlaylistsStore} />      
};