import React from "react";

export const EmbeddedSpotify = ({ spotidyId }) => {
    return (
      <iframe 
        callback={state => !state.isPlaying && setPlay(false)}
        style={{ borderRadius:"12px" }}
        src={`https://open.spotify.com/embed/track/${spotidyId}?utm_source=generator`}
        width="100%" height="152" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>)
  }
  