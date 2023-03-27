import React, { Component } from "react";
import { Accordion, AccordionButton, Button, Col, Container, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical, faListUl } from "@fortawesome/free-solid-svg-icons";

import { playlistData } from "./testData";

const msToMin = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

export const Playlists = () => {
    return (
        <Container>
            <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <Accordion>
                    {playlistData.map((entry, index) =>
                                    
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header className="d-flex">
                                <Button className="me-3" variant="success"><FontAwesomeIcon icon={faPlay} /></Button>
                                <strong>{entry.playlistName}</strong>&nbsp;playlist
                            </Accordion.Header>
                            
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    {entry.list.tracks.map((trackDetails, index) =>
                                    <ListGroupItem action>
                                    <Row>
                                        <Col xs="1" className="d-flex justify-content-start my-auto">
                                            <Button variant="outline-success">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </Button>
                                        </Col>  
                                        <Col xs="1" className="my-auto">
                                            {index + 1}
                                        </Col>
                                        <Col xs="1" className="justify-content-center me-auto">
                                            <img src={trackDetails.album.images[2].url}></img>
                                        </Col>
                                        <Col xs="5" className="my-auto">
                                            <div className="text-start ps-2">
                                                <div className="fw-bold">{trackDetails.name}</div>
                                                {trackDetails.artists[0].name}
                                            </div>
                                        </Col>
                                        <Col xs="3" className="pe-4 my-auto text-end">
                                                <em>{trackDetails.album.name}</em>
                                        </Col>
                                        <Col xs="1" className="d-flex justify-content-center my-auto">
                                            {msToMin(trackDetails.duration_ms)}
                                        </Col>   
                                    </Row>
                                    </ListGroupItem>
                                )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>
            </Col>
            </Row>
        </Container>
    );
};