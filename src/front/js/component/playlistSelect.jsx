import React, { Component } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";


const msToMin = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const Playlists = ({ playlist }) => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Accordion>
            {playlist.map((entry, index) => (
              <Accordion.Item key={index} eventKey={index}>
                {console.log(entry)}
                <Accordion.Header>
                  <Button className="me-3" variant="success">
                    <FontAwesomeIcon icon={faPlay} />
                  </Button>
                  <strong>{entry.playlistName}</strong>&nbsp;playlist
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {entry.list.tracks.map((trackDetails, index) => (
                      <ListGroupItem action>
                        <Row>
                          <Col xs="1">
                            <div className="text-start">{index + 1}</div>
                          </Col>
                          <Col xs="5">
                            <div className="text-start">
                              <div className="fw-bold">{trackDetails.name}</div>
                              {trackDetails.artists[0].name}
                            </div>
                          </Col>
                          <Col xs="4">
                            <div className="text-end">
                              <em>{trackDetails.album.name}</em>
                            </div>
                          </Col>
                          <Col xs="2">
                            <div className="text-end">
                              {msToMin(trackDetails.duration_ms)}
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};
