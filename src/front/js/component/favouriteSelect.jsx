import React, { Component, useContext, useState } from "react";
import { Accordion, AccordionButton, Button, Card, Col, Container, Dropdown, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical, faListUl } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";

import { msToMin } from "./utils/msToMin";

export const Favourites = () => {
    const {store, actions} = useContext(Context);
    const [dropdownState, setDropdownState] = useState(false)

    const favouritesComponentBuilder = (
        <Card className="mb-5">

                {Object.values(store.favouritesStore).map(entry =>
                    <>
                    <Card.Header as="h4">Favourites - <em>{entry.length} songs</em></Card.Header>
                    <Card.Body>

                        <ListGroup variant="flush">                             
                            {entry.map((trackDetails, index) => (
                            <ListGroupItem action key={trackDetails.id}>
                            <Row className="d-flex align-items-center responsive_font">
                                <Col xs="1">
                                    <Dropdown autoClose={dropdownState}>
                                        <DropdownToggle variant="outline-success">
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => 
                                                (actions.removeFromFavourites("favouritesStore", trackDetails.name, index))
                                                }>Remove from favourites
                                            </Dropdown.Item>
                                    
                                            <Dropdown.Item onClick={() =>
                                                (actions.createNewPlaylist("playlistStore", trackDetails, "New Playlist"))
                                                }>Add to new playlist:
                                            </Dropdown.Item>

                                            {store.playlistStore.map(entry => 
                                                <Dropdown.Item onClick={() => 
                                                    (actions.addToPlaylist("playlistStore", trackDetails, entry.playlistName))
                                                    }>Add to "{entry.playlistName}"
                                                </Dropdown.Item>
                                            )}                                   
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                                <Col xs="1" className="d-flex justify-content-center">
                                    {index + 1}
                                </Col>

                                <Col xs="2">
                                    <img src={trackDetails.album.images[2].url}></img>
                                </Col>

                                <Col xs="4">
                                    <div className="text-start ps-2">
                                        <div className="fw-bold">{trackDetails.name}</div>
                                        {trackDetails.artists[0].name}
                                    </div>
                                </Col>

                                <Col xs="3" className="text-end">
                                    <em>{trackDetails.album.name}</em>
                                </Col>

                                <Col xs="1" className="d-flex justify-content-center">
                                    {msToMin(trackDetails.duration_ms)}
                                </Col>   
                            </Row>
                            </ListGroupItem>))}
                                    
                        </ListGroup>                
                    </Card.Body>
                    </> )}
                </Card>
    )

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    {favouritesComponentBuilder}
                </Col>
            </Row>
        </Container>
    );
}