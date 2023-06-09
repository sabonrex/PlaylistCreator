import React, { useContext, useRef, useState } from "react";
import { Dropdown, Form, InputGroup } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistRename = (playlistData) => {
    const { actions } = useContext(Context)
    const inputRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const renameLabel = `Rename ${playlistData.playlistName}`
    const handleSubmit = (event) => {
        event.preventDefault();
        const newPlaylistName = inputRef.current.value;
        actions.renamePlaylist(newPlaylistName, playlistData.playlistID);
        setDropdownOpen(false);
        inputRef.current.value = "";
    }
    
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
      };
    
    return (
        <>
        <Dropdown 
            show={dropdownOpen} 
            onToggle={handleDropdownToggle}
            drop={"down-centered"}>
            <DropdownToggle className="playlist-button mx-1">
                <FontAwesomeIcon icon={faPenToSquare} />
            </DropdownToggle>

            <Dropdown.Menu className="rename-dropdown">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="px-1" controlId="inputField">
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