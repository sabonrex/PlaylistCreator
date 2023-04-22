import React, { useContext, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";

import { Context } from "../store/appContext";

// import SpotifyWebApi from 'spotify-web-api-js';

const EmbeddedSpotify = () => {

    const { store } = useContext(Context)
  
    if (store.nowPlaying === null) {
      return (
        <div>
          <h1 style={{color: "white"}}>No song selected!</h1>
        </div>
      )
    }
  
    return (
      <Row className="d-flex justify-content-center align-items-top pb-3">
        <Col md={{ span: 10}}>
          <iframe 
              className="spotify_embed"
              style={{ borderRadius:"12px" }}
              src={`https://open.spotify.com/embed/track/${store.nowPlaying}?utm_source=generator`}
              width="100%" height="85" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
        </Col>  
      </Row>    
    )
  }

export default EmbeddedSpotify;




// const spotifyApi = new SpotifyWebApi();

// function EmbeddedSpotify() {
//   const {store, actions} = useContext(Context)
//   const playerRef = useRef(null);
//   spotifyApi.setAccessToken(actions.getAccessToken)
  
//   useEffect(() => {
//     const player = playerRef.current;
    
//     player.src = `https://open.spotify.com/embed/track/${store.nowPlaying}`;
//     player.allow = 'autoplay';

//     // Play the player automatically
//     player.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://open.spotify.com');

//     const onLoad = () => {
//       player.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://open.spotify.com');
//     };

//     player.addEventListener('load', onLoad);

//     return () => {
//       // Pause the player when the component unmounts
//       player.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), 'https://open.spotify.com');
//       player.removeEventListener('load', onLoad);
//     };
//   }, [store.nowPlaying]);

//   return (
//     <iframe
//       ref={playerRef}
//       width="100%"
//       height="300"
//       frameBorder="0"
//       allowtransparency="true"
//       allow="encrypted-media"
//     />
//   );
// }

// export default EmbeddedSpotify;