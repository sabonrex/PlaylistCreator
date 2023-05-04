import React from "react";
import { Accordion, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";

import { FavouritePlaylistDropdownFeats } from "./favouritePlaylistsDropdownFeats.jsx";
import { FavouritePlaylistAccordionFeatures } from "./favouritePlaylistAccordionFeatures.jsx";

import { msToMin } from "./utils/msToMin";


export const FavouritePlaylistAccordionBody = ({ favouritePlaylists, playlist }) => {

    const favouritePlaylistTracks = playlist.tracks?.map((track, index) =>
        <ListGroupItem key={track.id}>
            <Row className="d-flex align-items-center">   

                <Col lg="1" className="track_num justify-content-center">
                    {index + 1}
                </Col>

                <Col xs="4" sm="3" md="2" lg="2">
                    <img className="img-responsive me-1" src={track.image_thumb_url}></img>
                </Col>

                <Col xs="6" sm="8" md="5" lg="3">
                    <div className="text-start">
                        <div className="fw-bold" >{track.name}</div>
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
                    <FavouritePlaylistDropdownFeats playlist={playlist} listOfPlaylists={favouritePlaylists} track={track} />
                </Col>
            </Row>
        </ListGroupItem>
    );

    return (   
        <Accordion.Body className="py-0">
            <ListGroup variant="flush">
                {favouritePlaylistTracks}
                <FavouritePlaylistAccordionFeatures />
            </ListGroup>
        </Accordion.Body>
    );
};