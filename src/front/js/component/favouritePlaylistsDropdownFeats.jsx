import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistDropdownFeats = ({ listOfPlaylists, playlist }) => {
    const { actions } = useContext(Context);
    const [dropdownState, setDropdownState] = useState(false);

    const handleClickMoveTrack = (tracks, index, playlistOrigin, playlistDestiny) => {
        actions.moveToPlaylist("playlistStore", tracks, index, playlistOrigin, playlistDestiny)
    };

    return (
        <Dropdown autoClose={dropdownState}>

            <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </DropdownToggle>
            <Dropdown.Menu>

                <Dropdown.Item onClick={() => (
                    actions.addToFavourites("favouritesStore", tracks)
                    )}> Add to Favourites
                </Dropdown.Item>

                <Dropdown.Item onClick={() => (
                    actions.removeFromPlaylist("playlistStore", index, playlist.name) 
                    )}> Remove from this playlist                                               
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