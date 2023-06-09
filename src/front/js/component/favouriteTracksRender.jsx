import React, { useContext } from "react";
import { Card, Container, Col, Row, Dropdown, ListGroup } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

import { msToMin } from "./utils/msToMin";

// new version of export function that gets favorites directly from store
// just to make sure it works, I merged using the same change you made, buy inside favouritePlaylist.jsx

//export const FavouritePlayistsRender = () => {
//    const { store } = useContext(Context);
//    const listOfPlaylists = store.favPlaylistsStore;
//
export const FavouriteTracksRender = ({ listOfTracks }) => {
    const {store, actions} = useContext(Context);


    return (
        <Container className="col-10 pb-5">
            <Card className="mb-5">
                <Card.Body>
                    <ListGroup variant="flush">                             
                        {listOfTracks?.map((track, index) => (
                            <ListGroup.Item action={false} key={track.id}>
                                <Row className="d-flex align-items-center">

                                    <Col lg="1" className="track_num justify-content-center">
                                        {index + 1}
                                    </Col>

                                    <Col xs="4" sm="3" md="2" lg="2">
                                        <img className="img-responsive me-1" src={track.image_thumb_url}></img>
                                    </Col>

                                    <Col xs="6" sm="8" md="5" lg="3">
                                        <div className="text-start">
                                            <div className="fw-bold">{track.title}</div>
                                            {track.artist}
                                        </div>
                                    </Col>

                                    <Col md="4" lg="4" className="album_name text-end">
                                        <em>{track.album}</em>
                                    </Col>

                                    <Col lg="1" className="track_length ms-auto">
                                        {msToMin(track.duration_ms)}
                                    </Col>

                                    <Col xs="2" sm="1" md="1" lg="1">
                                        <Dropdown autoClose>
                                            <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </DropdownToggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => 
                                                    (actions.removeFromFavourites(track, index))
                                                    }>Remove from favourites
                                                </Dropdown.Item>

                                                {store.favPlaylistsStore.map((playlist, index) => 
                                                    <Dropdown.Item key = {index} onClick={() => 
                                                        actions.addToPlaylist(track, playlist.id)
                                                        }>Add to "{playlist.name}"
                                                    </Dropdown.Item>
                                                )}                                   
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                        
                                </Row>
                            </ListGroup.Item>))}     
                    </ListGroup>                
                </Card.Body>
            </Card>
        </Container>
    )
}