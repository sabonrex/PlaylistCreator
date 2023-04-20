import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { Context } from "../store/appContext";

export const EmbeddedSpotify = () => {

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