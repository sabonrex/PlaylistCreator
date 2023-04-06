import React, { Component, useContext, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical, faListUl } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";

import { msToMin } from "./utils/msToMin";

export const Playlists = () => {
    const {store, actions} = useContext(Context);
    const [dropdownState, setDropdownState] = useState(false);

    const popover = (
        <Popover id="popover-basic" onClick={() => setDropdownState(true)}>
            <Popover.Body >
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );

    const playlistComponentBuilder = (
        <Accordion>
            {store.playlistStore.map((entry, index) =>                 
                <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header className="d-flex">
                        <Button className="me-3" variant="success"><FontAwesomeIcon icon={faPlay} /></Button>
                            <strong>{entry.playlistName}</strong> &nbsp;
                            <em>- {entry.list.tracks.length} songs</em>  
                    </Accordion.Header>
                          
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {entry.list.tracks.map((trackDetails, index) =>
                                <ListGroupItem action key={trackDetails.id}>
                                <Row Row className="d-flex align-items-center responsive_font">
                                <Col xs="1">
                                    <Dropdown autoClose={dropdownState}>

                                        <DropdownToggle variant="outline-success" >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </DropdownToggle>
                                        <Dropdown.Menu>

                                            <Dropdown.Item onClick={() => (
                                                actions.addToFavourites("favouritesStore", trackDetails)
                                                )}> Add to Favourites
                                            </Dropdown.Item>

                                            <Dropdown.Item onClick={() => (
                                                actions.removeFromPlaylist("playlistStore", index, entry.playlistName)
                                                )}> Remove from this playlist                                               
                                            </Dropdown.Item>

                                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                <Dropdown.Item> Move to new playlist:
                                                </Dropdown.Item>
                                            </OverlayTrigger>
                                            

                                            {store.playlistStore.map(storeEntry => 
                                                {if (storeEntry.playlistName !== entry.playlistName) {
                                                    return (
                                                    <Dropdown.Item onClick={() => 
                                                    actions.moveToPlaylist(
                                                        "playlistStore", trackDetails, index, entry.playlistName, storeEntry.playlistName
                                                        )}> Move to "{storeEntry.playlistName}"                                                       
                                                    </Dropdown.Item>
                                                    )}                                                
                                                }
                                            )};
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>   

                                    <Col xs="1" className="d-flex justify-content-center">
                                        {index + 1}
                                    </Col>

                                    <Col xs="2 pe-1">
                                        <img src={trackDetails.album.images[2].url}></img>
                                    </Col>

                                    <Col xs="4">
                                        <div className="text-start">
                                            <div className="fw-bold" >{trackDetails.name}</div>
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
                                </ListGroupItem>
                              )}
                              </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            )};
        </Accordion>
    )

    return (
        <Container className = "pb-3">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    {playlistComponentBuilder}
                </Col>
            </Row>
        </Container>
    );
};