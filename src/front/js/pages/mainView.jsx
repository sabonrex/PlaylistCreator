import React from "react";

import "../../styles/index.css";

export const MainView = () => {

  return (
    <section className="h-100 w-100 py-5" style={{"backgroundColor": "#1D2343"}}>
        <div className="container text-center">
            <h1 className="jumbo-text">Find Your <span style={{"color": "#BAFF4F"}}>Music</span></h1>
            <button>Discover</button>
        </div>
    </section>
  );
};