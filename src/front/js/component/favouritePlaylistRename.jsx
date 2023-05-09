import React, { useContext } from "react";
import { Container, Dropdown, Form, ListGroupItem } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";


export const FavouritePlaylistRename = (playlistName) => {
    const { actions } = useContext(Context)
    const renameLabel = `Rename ${playlistName.playlistName}`
    
    return (
        <>
        <div className="playlist-button mx-1">
            <FontAwesomeIcon icon={faPenToSquare} />
        </div>

        <Dropdown autoClose>

            <DropdownToggle className="playlist-button">
                <FontAwesomeIcon icon={faPenToSquare} />
            </DropdownToggle>

            <Dropdown.Menu>

                <Dropdown.Item> 
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder={renameLabel} />
                    </Form.Group>
                </Form>
                </Dropdown.Item>

            </Dropdown.Menu>

        </Dropdown>
        </>
    )
}