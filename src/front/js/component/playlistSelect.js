import React, { Component } from "react";
import { Accordion, Col, Container, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap";
import { playlistData } from "./testData";

export const Playlists = () => {
    return (
        <Container>
            <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <Accordion defaultActiveKey="0">
                    {playlistData.map((entry, index) =>            
                        <Accordion.Item key={index} eventKey={index}>

                            <Accordion.Header>
                                <strong>{entry.playlistName}</strong>&nbsp;playlist
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    {entry.trackList.map((trackDetails, index) =>
                                    <ListGroupItem key={trackDetails.trackName} action>
                                    <Row>
                                        <Col xs="1">
                                            <div className="text-start">
                                                {index +1}
                                            </div>
                                        </Col>
                                        <Col xs="5">
                                            <div className="text-start">
                                                <div className="fw-bold">{trackDetails.trackName}</div>
                                                {trackDetails.artist}
                                            </div>
                                        </Col>
                                        <Col xs="4">
                                            <div className="text-end">
                                                <em>{trackDetails.album}</em>
                                            </div>
                                        </Col>
                                        <Col xs="2">
                                            <div className="text-end">{trackDetails.length}</div>
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