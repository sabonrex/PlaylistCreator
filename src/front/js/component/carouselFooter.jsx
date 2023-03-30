import React from "react";

import { CarouselComponent } from "./carouselComponent.jsx";



export const CarouselFooter = ({ tracks }) => {
    return <CarouselComponent tracks={tracks} itemsPerSlide={4} />
  };