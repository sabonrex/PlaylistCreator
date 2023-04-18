import React, { useContext, useState } from "react";
import { Card, Col, Container, Dropdown, ListGroup, ListGroupItem, Row, ThemeProvider } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

import { msToMin } from "./utils/msToMin";

export const FavouriteTracksRender = ({ listOfTracks }) => {
    const {store, actions} = useContext(Context);
    const [dropdownState, setDropdownState] = useState(false);

    const favouritesComponentBuilderII = (
        <Card className="mb-5">
            <Card.Header as="h4">Favourites - <em>{listOfTracks.length} songs</em></Card.Header>
            <Card.Body>
                <ListGroup variant="flush">                             
                    {listOfTracks?.map((track, index) => (
                        <ListGroupItem action key={track.id}>
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
                                    <Dropdown autoClose={dropdownState}>
                                        <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </DropdownToggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => 
                                                (actions.removeFromFavourites("favouritesStore", track.name, index))
                                                }>Remove from favourites
                                            </Dropdown.Item>
                                    
                                            <Dropdown.Item onClick={() =>
                                                (actions.createNewPlaylist("playlistStore", track, "New Playlist"))
                                                }>Add to new playlist:
                                            </Dropdown.Item>

                                            {store.playlistStore.map(playlist => 
                                                <Dropdown.Item onClick={() => 
                                                    (actions.addToPlaylist("playlistStore", track, playlist.playlistName))
                                                    }>Add to "{playlist.playlistName}"
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

    const favouritesComponentBuilder = (
        <Card className="mb-5">

                {Object.values(store.favouritesStore).map(entry =>
                    <>
                    <Card.Header as="h4">Favourites - <em>{entry.length} songs</em></Card.Header>
                    <Card.Body>

                        <ListGroup variant="flush">                             
                            {entry.map((trackDetails, index) => (
                            <ListGroupItem action key={trackDetails.id}>
                            
                            <Row className="d-flex align-items-center">

                                <Col lg="1" className="track_num justify-content-center">
                                    {index + 1}
                                </Col>

                                <Col xs="4" sm="3" md="2" lg="2">
                                    <img className="img-responsive me-1" src={trackDetails.album.images[2].url}></img>
                                </Col>

                                <Col xs="6" sm="8" md="5" lg="3">
                                    <div className="text-start">
                                        <div className="fw-bold">{trackDetails.name}</div>
                                        {trackDetails.artists[0].name}
                                    </div>
                                </Col>

                                <Col md="4" lg="4" className="album_name text-end">
                                    <em>{trackDetails.album.name}</em>
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
                    </> )}
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
                        {favouritesComponentBuilderII}
                    </Col>
                </Row>
            </ThemeProvider>
        </Container>

    );
}