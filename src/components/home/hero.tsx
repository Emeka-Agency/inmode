import React from "react";
import Img from "gatsby-image";

import { useImages } from '../contexts/images-provider';
import { graphql, useStaticQuery } from "gatsby";

import './hero.css';

const Hero = ({}:Hero) => {

    const [datas] = React.useState(useStaticQuery(graphql`
        {
            strapiHeroHeader {
                TopText
                BottomText
            }
        }
    `).strapiHeroHeader);

    const images = useImages();

    const txt_lg = `InMode's innovative technologies provide superior results for your patients.`;
    const txt_md = `Treatments for the face, body, skin and women's wellness.`;

    return (
        <div
            className="home-hero"
            style={{
                backgroundImage: `url(${images.get_one('heroFull').publicURL})`
            }}
        >
            <div className="hero-right">
                <div className="hero-right-txt_lg user-select-none">{txt_lg}</div>
                <div className="hero-right-txt_md user-select-none">{txt_md}</div>
                <a className="hero-right-button user-select-none">learn more</a>
            </div>
        </div>
    );
};

interface Hero {

};

export default Hero;