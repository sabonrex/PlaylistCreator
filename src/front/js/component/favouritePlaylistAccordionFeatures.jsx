import React from "react";
import { Container, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

export const FavouritePlaylistAccordionFeatures = () => {

    return (
        <ListGroupItem>
            <Container className="d-flex justify-content-center align-items-center"> 
                <div className="playlist-button mx-1"><FontAwesomeIcon icon={faPenToSquare} /></div>
                <div className="playlist-button mx-1"><FontAwesomeIcon icon={faTrash} /></div>
            </Container>
        </ListGroupItem>
    );
};