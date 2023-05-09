import React, { useContext } from "react";
import { Container, Dropdown, ListGroupItem } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

import { FavouritePlaylistRename } from "./favouritePlaylistRename.jsx";

import { Context } from "../store/appContext";

export const FavouritePlaylistAccordionFeatures = ({ playlist }) => {
    const { actions } = useContext(Context);

    const removePlaylist = () => {
        actions.removePlaylistFromStore(playlist.id);
        actions.removePlaylist(playlist.id);
    }

    return (
        <ListGroupItem>
            <Container className="d-flex justify-content-center align-items-center">
                <FavouritePlaylistRename playlistName={playlist.name} playlistID={playlist.id}/>
                <div className="playlist-button mx-1" onClick={removePlaylist}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </Container>
        </ListGroupItem>
    );
};