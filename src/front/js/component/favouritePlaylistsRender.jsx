import React, { useContext } from "react";
import { Accordion, Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext.js";
import { FavouritePlaylistDropdownFeats } from "./favouritePlaylistsDropdownFeats.jsx";

import { msToMin } from "./utils/msToMin";


// new version of export function that gets favorites directly from store

//
export const FavouritePlayistsRender = () => {
    const { store } = useContext(Context);
    
    const listOfPlaylists = store.favPlaylistsStore;
//

// original statement
//
// export const FavouritePlayistsRender = ({ listOfPlaylists }) => {
//
    return (
        <Container className="col-10">
            <Accordion>
                {listOfPlaylists?.map((playlist) =>                 
                    <Accordion.Item key={playlist.id} eventKey={playlist.id}>
                        <Accordion.Header className="d-flex">
                            <div className="btn btn-success me-3" variant="success"><FontAwesomeIcon icon={faPlay} /></div>
                            <strong>{playlist.name}</strong> &nbsp;
                            <span>- {playlist.tracks.length} songs</span> 
                            <div className="delete-button"><FontAwesomeIcon icon={faTrash} /></div>
                        </Accordion.Header>
                            
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                {playlist.tracks?.map((tracks, index) =>
                                    <ListGroupItem key={tracks.id}>

                                    <Row className="d-flex align-items-center">   

                                        <Col lg="1" className="track_num justify-content-center">
                                            {index + 1}
                                        </Col>

                                        <Col xs="4" sm="3" md="2" lg="2">
                                            <img className="img-responsive me-1" src={tracks.image_thumb_url}></img>
                                        </Col>

                                        <Col xs="6" sm="8" md="5" lg="3">
                                            <div className="text-start">
                                                <div className="fw-bold" >{tracks.name}</div>
                                                {tracks.artist}
                                            </div>
                                        </Col>

                                        <Col md="4" lg="4" className="album_name text-end">
                                            <em>{tracks.album}</em>
                                        </Col>

                                        <Col lg="1" className="track_length ms-auto">
                                            {msToMin(tracks.duration_ms)}
                                        </Col>  
                                        
                                        <Col xs="2" sm="1" md="1" lg="1">
                                            <FavouritePlaylistDropdownFeats playlist={playlist} listOfPlaylists={listOfPlaylists} track={tracks} />
                                        </Col>
                                        

                                    </Row>
                                    </ListGroupItem>
                                )}
                                </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                )};
            </Accordion>
        </Container>
    );
};