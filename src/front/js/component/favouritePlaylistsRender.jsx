import React from "react";
import { Accordion, Container } from "react-bootstrap";

import { FavouritePlayistsAccordionHeader } from "./favouritePlaylistAccordionHeader.jsx";
import { FavouritePlaylistAccordionBody } from "./favouritePlaylistAccordionBody.jsx";


// new version of export function that gets favorites directly from store
// just to make sure it works, I merged using the same change you made, buy inside favouritePlaylist.jsx

//export const FavouritePlayistsRender = () => {
//    const { store } = useContext(Context);
//    const listOfPlaylists = store.favPlaylistsStore;
//

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