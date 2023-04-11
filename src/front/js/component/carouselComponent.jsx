import React, { useContext } from "react";
import { Accordion, Carousel, Col, Row } from "react-bootstrap";

import { Context } from "../store/appContext";

export const CarouselComponent = ({ tracks, itemsPerSlide }) => {
    
    const { store } = useContext(Context)

    const slides = tracks.reduce((accumulator, track, index) => {
      if (index % itemsPerSlide === 0) {
        accumulator.push([]);
      }
  
      accumulator[accumulator.length - 1].push(track);
      return accumulator;
    }, []);
  
const handlePlay = (e) =>{
    document.querySelector("iframe").src = `https://open.spotify.com/embed/track/${e.target.id}`
}

    return (
        <>
        <Row className="d-flex justify-content-center align-items-top pb-3">
            <Col md={{ span: 10 }}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Now Playing
                    </Accordion.Header>

                    <Accordion.Body style={{ backgroundColor: "#1D2343" }}>
                        {store.defaultFooter}

                        <Carousel controls={slides.length > 1} indicators={slides.length > 1} interval={3000} >
                        {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div className="row d-flex justify-content-center align-items-top pb-3" 
                            style={{ height: "100%", backgroundColor: "#1D2343" }} >
                                {slide.map((track) => (
                                <div key={track.id} className="col-2" >
                                    <div className="card shadow" style={{ backgroundColor: "#DC6B5E", borderRadius: "10px"}} >
                                        <img
                                        id={track.id} onClick={(e)=>handlePlay(e)}
                                            className="card-img-top"
                                            src={track.image_url}
                                            alt={track.alt}
                                            style={{ borderRadius: "10px"}}
                                        />
                                    </div>
                                    <div className="card-body text-light text-center px-1" style={{height: "72px", maxHeight: "72px"}}>
                                        <h5 className="card-title fs-5">{track.title}</h5>
                                        <p className="card-text">{track.artist}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </Carousel.Item>
                        ))}
                        </Carousel>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </Col>
        </Row>
        </>
    );
  };