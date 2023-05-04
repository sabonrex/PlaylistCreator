import React from "react";
import { Accordion, Container } from "react-bootstrap";

import { FavouritePlayistsAccordionHeader } from "./favouritePlaylistAccordionHeader.jsx";
import { FavouritePlaylistAccordionBody } from "./favouritePlaylistAccordionBody.jsx";


export const FavouritePlayistsRender = ({ listOfPlaylists }) => {

    return (
        <Container className="col-10">
            <Accordion>
                {listOfPlaylists?.map((playlist) =>                 
                    <Accordion.Item key={playlist.id} eventKey={playlist.id}>
                        <FavouritePlayistsAccordionHeader 
                            playlistName={playlist.name} 
                            nTracks={playlist.tracks.length} 
                        />
                            
                        <FavouritePlaylistAccordionBody
                            playlist={playlist}
                            favouritePlaylists={listOfPlaylists} 
                        />
                    </Accordion.Item>
                )};
            </Accordion>
        </Container>
    );
};