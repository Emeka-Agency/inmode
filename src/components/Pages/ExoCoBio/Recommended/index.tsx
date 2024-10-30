import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioRecommended = ({  }:ExoCoBioRecommended) => {

    const images = useImages();

    return (
        <div id="page_exocobio-recommend">
            <h2>RECOMMENDED TO USE WITH</h2>
            <img id="page_exocobio-recommend-logo" src={images.resolve_img('ExoCobioRecommendLogo')} srcSet={images.resolve_img_set('ExoCobioRecommendLogo')}/>
            <img id="page_exocobio-recommend-machine" src={images.resolve_img('ExoCobioRecommendMachine')} srcSet={images.resolve_img_set('ExoCobioRecommendMachine')}/>
        </div>
    );
};

interface ExoCoBioRecommended {

};

export default ExoCoBioRecommended;
