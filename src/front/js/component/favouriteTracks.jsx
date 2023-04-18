import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FavouriteTracksRender } from "./favouriteTracksRender.jsx";

export const FavouriteTracks = () => {
    const {store, actions} = useContext(Context);
    const [userFavouriteTracks, setUserFavouriteTracks] = useState([]);

    const fetchFavouriteTracks = async () => {
        try {
            const tracks = await actions.fetchFavouriteTracks();
            setUserFavouriteTracks(() => tracks);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFavouriteTracks();
    }, [])

    return <FavouriteTracksRender listOfTracks={userFavouriteTracks} />;
}