import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// IgniteRFBa1FormaI
// IgniteRFBa2FormaI
// IgniteRFBa3FormaI

const images_ba = [
    // "IgniteRFBa1FormaI",
    // "IgniteRFBa2FormaI",
    // "IgniteRFBa3FormaI"
];

const IgniteRFBeforeAfter = ({}:IgniteRFBeforeAfter) => {

    const images = useImages();

    return (
        <div id="page-igniterf-ba">
            <h2>AVANT & APRÈS</h2>
            <div id="page-igniterf-ba-carousel">
                {
                    images_ba.length == 0 ? <h2>Aucune image pour le moment</h2> : 
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
                }
            </div>
        </div>
    );
};

interface IgniteRFBeforeAfter {

};

export default IgniteRFBeforeAfter;