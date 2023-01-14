import React from "react";
import { useImages } from "../contexts/images-provider";

import "./index.css";

const AwardsSection = ({}:AwardsSection) => {

    const images = useImages();

    return (
        <div className="awards-section">
            <h2 className="awards-title">AWARD WINNING IDEAS</h2>
            {images.getOne('awardElle') && <img
                src={images.getOne('awardElle').publicURL}
                className="awards-img"
                />}
            {images.getOne('awardShape') && <img
                src={images.getOne('awardShape').publicURL}
                className="awards-img"
                />}
            {images.getOne('awardBeauty') && <img
                src={images.getOne('awardBeauty').publicURL}
                className="awards-img"
            />}
            {images.getOne('award2021') && <img
                src={images.getOne('award2021').publicURL}
                className="awards-img"
            />}
            {images.getOne('awardDiamonds') && <img
                src={images.getOne('awardDiamonds').publicURL}
                className="awards-img"
            />}
        </div>
    );
};

interface AwardsSection {

};

export default AwardsSection;