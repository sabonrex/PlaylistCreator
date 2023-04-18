import React, { useContext, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Row,
  ThemeProvider
} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";

import { msToMin } from "./utils/msToMin";


export const FavouritePlayistsRender = ({listOfPlaylists}) => {
    const {store, actions} = useContext(Context);
    const [dropdownState, setDropdownState] = useState(false);

    const handleClickMoveTrack = (tracks, index, playlistOrigin, playlistDestiny) => {
        actions.moveToPlaylist("playlistStore", tracks, index, playlistOrigin, playlistDestiny)
    };

    const playlistComponentBuilderII = (
        <Accordion>
            {listOfPlaylists?.map((playlist) =>                 
                <Accordion.Item key={playlist.id} eventKey={playlist.id}>
                    <Accordion.Header className="d-flex">
                        <div className="btn btn-success me-3" variant="success"><FontAwesomeIcon icon={faPlay} /></div>
                            <strong>{playlist.name}</strong> &nbsp;
                            <em>- {playlist.tracks.length} songs</em>  
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
                                        <Dropdown autoClose={dropdownState}>

                                            <DropdownToggle className="ms-1 me-auto" variant="outline-success">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </DropdownToggle>
                                            <Dropdown.Menu>

                                                <Dropdown.Item onClick={() => (
                                                    actions.addToFavourites("favouritesStore", tracks)
                                                    )}> Add to Favourites
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() => (
                                                    actions.removeFromPlaylist("playlistStore", index, playlist.name) 
                                                    )}> Remove from this playlist                                               
                                                </Dropdown.Item>                                                

                                                {listOfPlaylists.map((playlistName, index) => 
                                                    {if (playlistName.name !== playlist.name) {
                                                        return (
                                                            <Dropdown.Item key={index} onClick={() => handleClickMoveTrack(tracks, index, playlist.name, playlistName.name)}>
                                                                Move to "{playlistName.name}"                                                       
                                                            </Dropdown.Item>
                                                        )}                                                
                                                    }
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                     

                                </Row>
                                </ListGroupItem>
                              )}
                              </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            )};
        </Accordion>
    );

    return (
        <Container>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xs">
                <Row>
                    <Col
                        md={{ span: 10, offset: 1 }}
                        lg={{ span: 10, offset: 1 }}>
                        {playlistComponentBuilderII}
                    </Col>
                </Row>                
            </ThemeProvider>
        </Container>
    );
};