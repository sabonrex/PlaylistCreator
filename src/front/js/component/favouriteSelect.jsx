import React, { useContext, useState } from "react";
import { Accordion, AccordionButton, Button, Card, Col, Container, Dropdown, ListGroup, ListGroupItem, Row, ThemeProvider } from "react-bootstrap";
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
                <Card.Header as="h4">Favourites - <em>{store.favouritesStore.length} songs</em></Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">                             
                        {store.favouritesStore.map((trackDetails, index) => (
                        <ListGroupItem action key={trackDetails.id}>
                            
                        <Row className="d-flex align-items-center">

                            <Col lg="1" className="track_num justify-content-center">
                                {index + 1}
                            </Col>

                            <Col xs="4" sm="3" md="2" lg="2">
                                <img className="img-responsive me-1" 
                                src={trackDetails.image_url} 
                                style={{ width: 64, height: 64 }}></img>
                            </Col>

                            <Col xs="6" sm="8" md="5" lg="3">
                                <div className="text-start">
                                    <div className="fw-bold">{trackDetails.title}</div>
                                    {trackDetails.artist}
                                </div>
                            </Col>

                            <Col md="4" lg="4" className="album_name text-end">
                                <em>{trackDetails.album}</em>
                            </Col>

                            <Col lg="1" className="track_length ms-auto">
                                {msToMin(trackDetails.duration_ms)}
                            </Col>

                            <Col xs="2" sm="1" md="1" lg="1">
                                <Dropdown autoClose={dropdownState}>
                                    <DropdownToggle className="ms-1 me-auto" variant="outline-success">
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
                                   
                        </Row>
                        </ListGroupItem>))}
                                    
                    </ListGroup>                
                </Card.Body>
                    
            </Card>
    )

    return (
        <Container className="pb-5">
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xs">
                <Row>
                    <Col
                        md={{ span: 10, offset: 1 }}
                        lg={{ span: 10, offset: 1 }}>
                        {favouritesComponentBuilder}
                    </Col>
                </Row>
            </ThemeProvider>
        </Container>

    );
}