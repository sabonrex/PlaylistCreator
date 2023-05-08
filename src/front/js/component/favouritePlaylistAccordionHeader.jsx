import React from "react";
import { Accordion, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const FavouritePlayistsAccordionHeader = ({ playlistName, nTracks }) => {

    return (
        <Accordion.Header className="d-flex">
            <Col md={1}>
                <div className="playlist-play-button me-3" variant="success"><FontAwesomeIcon icon={faPlay} /></div>
            </Col>
            <Col md={10}>
                <strong>{playlistName}</strong> <br />
                <span style={{fontSize: "0.85rem"}}>{nTracks} Songs</span> 
            </Col>
        </Accordion.Header>
    );
};