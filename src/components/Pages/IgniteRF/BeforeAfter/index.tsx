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
    {doctor: "Dr. Z. Willis (Facetite)", img: "IgniteRFBeforeAfterWillis", alt: "Dr. Z. Willis (Facetite).jpg"},
    {doctor: "Diamond Aesthetics (M8 Burst Deep)", img: "IgniteRFBeforeAfterDiamond", alt: "Diamond Aesthetics (M8 Burst Deep).jpg"},
    {doctor: "Dr. J. Raniere (Bodytite)", img: "IgniteRFBeforeAfterRaniere", alt: "Dr. J. Raniere (Bodytite).jpg"},
    {doctor: "Dr. M. Clifton (Accutite + M8)", img: "IgniteRFBeforeAfterClifton", alt: "Dr. M. Clifton (Accutite + M8).png"},
    {doctor: "Dr. M. Loffredo & Dr. S. Jones", img: "IgniteRFBeforeAfterLoffredo", alt: "Dr. M. Loffredo & Dr. S. Jones.jpg"},
    {doctor: "Dr. M. Tarajki (Facetite)", img: "IgniteRFBeforeAfterTarajki", alt: "Dr. M. Tarajki (Facetite).jpg"},
    {doctor: "Dr. P. Hester", img: "IgniteRFBeforeAfterHester", alt: "Dr. P. Hester.jpg"},
    {doctor: "Dr. R. Diepenbrock (Facetite + M8)", img: "IgniteRFBeforeAfterDiepenbrock", alt: "Dr. R. Diepenbrock (Facetite + M8).jpg"},
    {doctor: "Dr. R. Malhotra (BodyTite)", img: "IgniteRFBeforeAfterMalhotra", alt: "Dr. R. Malhotra (BodyTite).jpg"},
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
                        {images_ba.map((ba, key) => {
                            console.log(images.resolve_img(ba.img));
                            return (
                                <div key={key} className="ba-image">
                                    <img src={images.resolve_img(ba.img)} alt={`${ba.alt}`}/>
                                    <span>{ba.doctor}</span>
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