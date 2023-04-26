import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { getToken } from "../auth/getToken.js";

export const AddFavouritePlaylistButton = () => {
    const { store } = useContext(Context);

    if (store.randomPlaylist.length == 0) return null;

    const handleClick = () => {
      console.log("Saving playlist");
      console.log(store.randomPlaylist);
    }

    return (
      <button className="fav-playlist-button mb-5" onClick={handleClick} >
        Do you like it? Save it!
      </button>
    )
};

const addUserFavouritePlaylist = async (playlistId) => {
  const { store } = useContext(Context);
  const token = getToken();
  const endpoint = `${store.apiUrl}/api/user/favourites/playlists/${playlistId}`

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }
    });

    const jsonResponse = await response.json()
    return jsonResponse

  } catch (error) {
    console.error(error)
  }

}