import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistDropdownFeats = ({ listOfPlaylists, playlist, track }) => {
    const { actions } = useContext(Context);

    const addTrackToFavTracks = () => {
        actions.addTrackToFavourites(track)
    }

    const removeTrackFromPlaylist = () => {
        actions.removeFromPlaylist(playlist, track)
    }

    const moveTrack = (targetPlaylist) => {
        actions.moveToPlaylist(track, playlist, targetPlaylist)
    }

    const DropdownListMoveToPlaylists = listOfPlaylists.map((targetPlaylist, index) => {
        if (targetPlaylist.name !== playlist.name) {
            return (
                <Dropdown.Item key={index} onClick={() => moveTrack(targetPlaylist)}>
                    Move to "{targetPlaylist.name}"                                                       
                </Dropdown.Item>
            )
        }                                                
    })

    return (
        <Dropdown autoClose>

            <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </DropdownToggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={addTrackToFavTracks}> 
                    Add to your Favourite Tracks
                </Dropdown.Item>

                <Dropdown.Item onClick={removeTrackFromPlaylist}> 
                    Remove Track from this Playlist                                               
                </Dropdown.Item>                                                

                {DropdownListMoveToPlaylists}

            </Dropdown.Menu>

        </Dropdown>
    );
};