import React from "react";

import { CarouselComponent } from "./carouselComponent.jsx";
import { tracks } from "./testDataAlbuns.js";


export const CarouselFooter = () => {
    return (
      <div className="App">
        <CarouselComponent tracks={tracks} />
      </div>
    );
  };