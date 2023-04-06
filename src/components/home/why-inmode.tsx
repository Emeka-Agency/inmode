import React from "react";
import Carousel from "../Carousel";
import { useImages } from '../contexts/images-provider';
import { FlickityOptions_Interface } from "../interfaces";

import "./why-inmode.css";

const WhyInmode = ({}:WhyInmode) => {

    const texts = [
        "",
        "",
        "",
        ""
    ];

    return (
        <section className="why-inmode-home">
            <div className="why-inmode-hex"></div>
            <h2 className="why-inmode-title">why choose inmode</h2>
            <div className="why-inmode-args">
                <div className="why-inmode-args-txt"></div>
                <div className="why-inmode-args-video"></div>
            </div>
        </section>
    );
};

interface WhyInmode {

};

export default WhyInmode;