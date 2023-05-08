import React from "react";

import { FavouritePlayists } from "../component/favouritePlaylists.jsx";
import { FavouriteTracks } from "../component/favouriteTracks.jsx";
import { AuthPage } from "../auth/authPage.jsx";

import "../../styles/index.css";
import "../../styles/favourites.css";

export const FavouritesView = () => {
  return (
    <AuthPage>
      <FavouritesPage />
    </AuthPage>
  );
}

export const FavouritesPage = () => {

  return (
    <div className="container text-center py-4 my-4">
      <h2 className="jumbo-text mt-4 mb-5" style={{fontWeight: "calc(3rem + 2.5vw)"}}>
        Your Favourite{" "}
        <span style={{ color: "#BAFF4F", fontWeight: "bold" }}>Music</span>
      </h2>
      <FavouritePlayists />
      <FavouriteTracks />
    </div>
  );
};