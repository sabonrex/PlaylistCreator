import React from "react";
import { Carousel } from "react-bootstrap";

export const CarouselComponent = ({ tracks }) => {
    const itemsPerSlide = 4;
  
    const slides = tracks.reduce((accumulator, track, index) => {
      if (index % itemsPerSlide === 0) {
        accumulator.push([]);
      }
  
      accumulator[accumulator.length - 1].push(track);
  
      return accumulator;
    }, []);
  
    return (
        <div className="py-5" style={{borderTop: "3px solid #D74390"}}>
            <Carousel controls={slides.length > 1} indicators={slides.length > 1} interval={3000} >
                {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <div className="row d-flex justify-content-center align-items-top pb-5" style={{ height: "100%", backgroundColor: "#1D2343" }} >
                        {slide.map((track) => (
                        <div key={track.id} className="col-sm-2">
                            <div className="card shadow" style={{ backgroundColor: "#DC6B5E", borderRadius: "10px"}} >
                                <img
                                    className="card-img-top"
                                    src={track.url}
                                    alt={track.alt}
                                    style={{ borderRadius: "10px"}}
                                />
                            </div>
                            <div className="card-body text-light text-center">
                                <h5 className="card-title fs-5">{track.title}</h5>
                                <p className="card-text">{track.artist}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
  };