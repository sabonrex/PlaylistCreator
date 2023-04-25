import React, { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

import { Context } from "../store/appContext";

export const AddFavouriteTrackButton = () => {
    const { store } = useContext(Context);
    const [onHover, setOnHover] = useState(false);

    const handleClick = () => {
        console.log("Saving playlist");
        console.log(store.randomPlaylist);
    }

    const handleOnOver = () => {
        setOnHover(true);
    }

    const handleOnOut = () => {
        setOnHover(false);
    }


    return (
        <FontAwesomeIcon 
            className="custom-fav-btn custom-notfav"
            size="xs"
            onClick={handleClick} 
            onMouseOver={handleOnOver} 
            onMouseOut={handleOnOut}
            icon={faHeart} 
            beat={onHover} 
        />
    )}

    