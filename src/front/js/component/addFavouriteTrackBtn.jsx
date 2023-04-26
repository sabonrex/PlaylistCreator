import React, { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { Context } from "../store/appContext";

export const AddFavouriteTrackButton = ({trackId, size}) => {
    const { actions } = useContext(Context);
    const [onHover, setOnHover] = useState(false);

    const handleClick = (track) => {
        actions.addUserFavouriteTrack(track);
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
            size={size}
            onClick={() => handleClick(trackId)} 
            onMouseOver={handleOnOver} 
            onMouseOut={handleOnOut}
            icon={faHeart} 
            beat={onHover} 
        />
    )}

    