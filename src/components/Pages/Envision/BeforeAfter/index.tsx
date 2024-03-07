import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// EnvisionBa1FormaI
// EnvisionBa2FormaI
// EnvisionBa3FormaI

const images_ba = [
    "EnvisionBa1FormaI",
    "EnvisionBa2FormaI",
    "EnvisionBa3FormaI"
];

const EnvisionBeforeAfter = ({}:EnvisionBeforeAfter) => {

    const images = useImages();

    return (
        <div id="page-envision-ba">
            <h2>AVANT & APRÈS</h2>
            <div id="page-envision-ba-carousel">
                <Carousel
                    loop={true}
                    scrollSnap={true}
                    hideArrows={false}
                    autoplay={1500}
                    showDots={true}
                    dotColorActive="#59b7b3"
                    dotColorInactive="#c7c7c7"
                    arrowLeft={images.resolve_img("arrowLeftIcon")}
                    arrowRight={images.resolve_img("arrowRightIcon")}
                >
                    {images_ba.map((image, key) => {
                        return (
                            <div key={key} className="ba-image">
                                <img src={images.resolve_img(image)} alt={`${image}`}/>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
};

interface EnvisionBeforeAfter {

};

export default EnvisionBeforeAfter;