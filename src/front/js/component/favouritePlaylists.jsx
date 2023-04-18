import React, { useContext, useState, useEffect } from "react";

import { Context } from "../store/appContext";
import { FavouritePlayistsRender } from "./favouritePlaylistsRender.jsx";


export const FavouritePlayists = () => {
    const {store, actions} = useContext(Context);
    const [userFavouritePlaylists, setUserFavouritePlaylists] = useState([]);

    const fetchFavouritePlaylists = async () => {
        try {
            const playlists = await actions.fetchFavouritePlayists();
            setUserFavouritePlaylists(() => playlists);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFavouritePlaylists();
    }, [])

    return <FavouritePlayistsRender listOfPlaylists={userFavouritePlaylists} />      
};