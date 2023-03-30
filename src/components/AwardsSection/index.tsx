import React from "react";
import { useImages } from "../contexts/images-provider";

import "./index.css";

const AwardsSection = ({}:AwardsSection) => {

    const images = useImages();

    return (
        <div className="awards-section">
            <h2 className="awards-title">AWARD WINNING IDEAS</h2>
            {images.resolve_img('awardElle') && <img
                src={images.resolve_img('awardElle')}
                className="awards-img"
                />}
            {images.resolve_img('awardShape') && <img
                src={images.resolve_img('awardShape')}
                className="awards-img"
                />}
            {images.resolve_img('awardBeauty') && <img
                src={images.resolve_img('awardBeauty')}
                className="awards-img"
            />}
            {images.resolve_img('award2021') && <img
                src={images.resolve_img('award2021')}
                className="awards-img"
            />}
            {images.resolve_img('awardDiamonds') && <img
                src={images.resolve_img('awardDiamonds')}
                className="awards-img"
            />}
        </div>
    );
};

interface AwardsSection {

};

export default AwardsSection;