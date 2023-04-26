import React, { useContext, useEffect } from "react";
import { Accordion, Carousel, Col, Row } from "react-bootstrap";

import { Context } from "../store/appContext";

export const CarouselComponent = ({ tracks, itemsPerSlide }) => {
    
    const { store, actions } = useContext(Context)

    const slides = tracks.reduce((accumulator, track, index) => {
      if (index % itemsPerSlide === 0) {
        accumulator.push([]);
      }
  
      accumulator[accumulator.length - 1].push(track);
      return accumulator;
    }, []);


    useEffect(() => {
        if (tracks.length != 0) {
            actions.addToDB(tracks)
        }
    }, [tracks]);
  
    const handlePlay = (e) => {
        // the track index onClick can be passed & stored in the store, 
        // and that can be used to advance to next song when current song ends
        console.log(tracks.indexOf(e))
        actions.setNowPlaying(e.spotify_id)
    };

    return (
        <>
        <Row className="d-flex justify-content-center align-items-top pb-3">
            <Col md={{ span: 10 }}>
                <Carousel controls={slides.length > 1} indicators={slides.length > 1} interval={3000} >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>

                        <div className="row d-flex justify-content-center align-items-top pb-3" 
                            style={{ height: "100%", backgroundColor: "#1D2343" }}>
                            
                            {slide.map((track) => (

                                <div className="col-2">

                                    <div key={track.id} onClick={() => handlePlay(track)}>
                                        <div className="card shadow" style={{ backgroundColor: "#DC6B5E", borderRadius: "10px"}}>
                                            <img id={track.id}
                                                className="card-img-top"
                                                src={track.image_url}
                                                alt={track.alt}
                                                style={{ borderRadius: "10px"}}>
                                            </img>                                        
                                        </div>
                                        <div className="card-body text-light text-center px-1" style={{height: "72px", maxHeight: "72px"}}>
                                            <h5 className="card-title fs-5">{track.title}</h5>
                                            <p className="card-text">{track.artist}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
        </Row>
        </>
    );
  };
