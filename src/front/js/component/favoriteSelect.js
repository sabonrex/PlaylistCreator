import React, { Component } from "react";
import { Accordion, AccordionButton, Button, Card, Col, Container, Dropdown, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical, faListUl } from "@fortawesome/free-solid-svg-icons";

import { favoritesData } from "./testDataFavorites";
import { msToMin } from "./utils/msToMin";

export const Favorites = ({ favorites }) => {
    return (
        <Container>
            <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <Card className="mb-5">
                    <Card.Header as="h5">Favorites</Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                        {favorites[0].tracks.map((trackDetails, index) =>                            
                            <ListGroupItem action>
                            <Row>
                                <Col xs="1" className="d-flex justify-content-start my-auto">
                                    <Dropdown>
                                        <DropdownToggle variant="outline-success">
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Remove from favorites</Dropdown.Item>
                                            <Dropdown.Item href="#">Add to playlist...</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </Col>  
                                    <Col xs="1" className="my-auto">
                                        {index + 1}
                                    </Col>
                                    <Col xs="1" className="justify-content-center pe-auto">
                                        <img src={trackDetails.album.images[2].url}></img>
                                    </Col>
                                    <Col xs="5" className="my-auto">
                                        <div className="text-start ps-2">
                                            <div className="fw-bold">{trackDetails.name}</div>
                                            {trackDetails.artists[0].name}
                                        </div>
                                    </Col>
                                    <Col xs="3" className="pe-4 my-auto text-start">
                                        <em>{trackDetails.album.name}</em>
                                    </Col>
                                    <Col xs="1" className="d-flex justify-content-center my-auto">
                                        {msToMin(trackDetails.duration_ms)}
                                    </Col>   
                                </Row>
                                </ListGroupItem>
                            )}
                        </ListGroup>                
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>

    );
}