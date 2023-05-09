import React, { useContext, useRef } from "react";
import { Container, Dropdown, Form, InputGroup, ListGroupItem } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistRename = (playlistData) => {
    const { actions } = useContext(Context)
    const inputRef = useRef(null);

    const renameLabel = `Rename ${playlistData.playlistName}`
    const handleSubmit = (event) => {
        event.preventDefault();
        const newPlaylistName = inputRef.current.value;
        actions.renamePlaylist(newPlaylistName, playlistData.playlistID)
    }
    
    return (
        <>
        <Dropdown>
            <DropdownToggle className="playlist-button mx-1">
                <FontAwesomeIcon icon={faPenToSquare} />
            </DropdownToggle>

            <Dropdown.Menu>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="inputField">
                        <InputGroup>
                            <Form.Control type="text" placeholder={renameLabel} ref={inputRef} />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
        </>
    )
}