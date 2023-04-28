import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { getToken } from "../auth/getToken.js";

export const AddFavouritePlaylistButton = () => {
    const { store, actions } = useContext(Context);
    
    if (store.randomPlaylist.length == 0) return null;
    
    const handleClick = () => {
      if (store.currentPlaylistSaved) alert("Already saved this playlist!");
      actions.saveRandomPlaylist()
      actions.setSavedPlaylist(true)
    }

    return (
      <button className="fav-playlist-button mb-5" onClick={handleClick} >
        Do you like it? Save it!
      </button>
    )
};

// logic to be added when playlist and tracks are set up properly
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
