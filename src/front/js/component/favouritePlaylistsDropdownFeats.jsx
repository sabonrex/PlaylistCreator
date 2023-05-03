import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistDropdownFeats = ({ listOfPlaylists, playlist, track }) => {
    const { store, actions } = useContext(Context);

    const handleTest = () => {
        console.log(store.favTracksStore)
        console.log(playlist.tracks)
        console.log(track)
    }

    const addTrackToFavTracks = () => {
        actions.addTrackToFavourites(track)
    }

    const removeTrackFromPlaylist = () => {
        actions.removeFromPlaylist(playlist, track)
    }

    const handleClickMoveTrack = (tracks, index, playlistOrigin, playlistDestiny) => {
        actions.moveToPlaylist("playlistStore", tracks, index, playlistOrigin, playlistDestiny)
    };

    return (
        <Dropdown autoClose>

            <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </DropdownToggle>
            <Dropdown.Menu>

                <Dropdown.Item onClick={handleTest}> 
                    Testing Function
                </Dropdown.Item>

                <Dropdown.Item onClick={addTrackToFavTracks}> 
                    Add to your Favourite Tracks
                </Dropdown.Item>

                <Dropdown.Item onClick={removeTrackFromPlaylist}> 
                    Remove from this Playlist                                               
                </Dropdown.Item>                                                

                {listOfPlaylists.map((playlistName, index) => 
                    {if (playlistName.name !== playlist.name) {
                        return (
                            <Dropdown.Item key={index} onClick={() => handleClickMoveTrack(tracks, index, playlist.name, playlistName.name)}>
                                Move to "{playlistName.name}"                                                       
                            </Dropdown.Item>
                        )}                                                
                    }
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};