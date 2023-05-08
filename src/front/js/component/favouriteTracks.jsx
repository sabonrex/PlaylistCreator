import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { FavouriteTracksRender } from "./favouriteTracksRender.jsx";

export const FavouriteTracks = () => {
    const {store } = useContext(Context);

    return <FavouriteTracksRender listOfTracks={store.favTracksStore} />;
}