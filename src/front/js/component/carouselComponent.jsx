import React, { useContext } from "react";
import { Carousel, Col, Row } from "react-bootstrap";

import { Context } from "../store/appContext";

import { AddFavouriteTrackButton } from "./addFavouriteTrackBtn.jsx";

export const CarouselComponent = ({ tracks, itemsPerSlide }) => {
    
    const { store, actions } = useContext(Context)

    const slides = tracks.reduce((accumulator, track, index) => {
      if (index % itemsPerSlide === 0) {
        accumulator.push([]);
      }
  
      accumulator[accumulator.length - 1].push(track);
      return accumulator;
    }, []);
  
    const handlePlay = (e) =>{
        actions.setNowPlaying(e)
    }

    return (
        <Row className="d-flex justify-content-center align-items-top">
            <Col md={12}>
                <Carousel 
                    controls={slides.length > 1} 
                    indicators={slides.length > 1} 
                    interval={3000}
                    prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                    nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />} 
                    style={{}}
                >
                    {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div className="row d-flex justify-content-center align-items-top pb-3" 
                        style={{ height: "100%", backgroundColor: "#1D2343" }} >
                            {slide.map((track) => (
                            <div key={track.id} className="col-2" >
                                <div className="card shadow" style={{ backgroundColor: "#DC6B5E", borderRadius: "10px"}} >
                                    <img
                                    id={track.id}
                                        className="card-img-top"
                                        src={track.image_url}
                                        alt={track.alt}
                                        style={{ borderRadius: "10px", cursor: "pointer"}}
                                        onClick={() => handlePlay(track.spotify_id)}
                                    />
                                </div>
                                <div className="card-body text-light text-start px-1" style={{height: "72px", maxHeight: "72px"}}>
                                    <Row>
                                        <Col xs={9}>
                                            <h5 className="card-title fs-6">{track.title}</h5>
                                            <p className="card-text">{track.artist}</p>
                                        </Col>
                                        <Col xs={3} className="text-end">
                                            <AddFavouriteTrackButton />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            ))}
                        </div>
                    </Carousel.Item>
                    ))}
                    
                </Carousel>
            </Col>
        </Row>
    );
};
