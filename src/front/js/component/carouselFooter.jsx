import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { CarouselComponent } from "./carouselComponent.jsx";
import { EmbeddedSpotify } from "./embeddedSpotifyTrack.jsx";

export const CarouselFooter = ({ tracks }) => {
  const { actions } = useContext(Context);

  const spotifyTrackId = actions.getSpotifyTrack();
  
  return (
        <div className="container-fluid fixed-bottom pt-4 mt-3" 
        style={{borderTop: "3px solid #D74390", backgroundColor: "#1D2343", bottom: 0}}>
          <EmbeddedSpotify spotifyId={spotifyTrackId}/>
          <CarouselComponent tracks={tracks} itemsPerSlide={5} />
        </div>
    )
  };