import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { CarouselComponent } from "./carouselComponent.jsx";
import "../../styles/carousel.css";

export const CarouselFooter = ({ tracks }) => {
  const { actions } = useContext(Context);

  const styles = {
    borderTop: "3px solid #D74390", 
    backgroundColor: "#1D2343", 
    bottom: 0
  }
  
  return (
        <div className="container-fluid pt-4 mt-3" style={styles}>
          <CarouselComponent tracks={tracks} itemsPerSlide={4} />
        </div>
    )
  };