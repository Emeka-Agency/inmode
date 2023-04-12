import React from "react";
import Img from "gatsby-image";

import { useImages } from '../contexts/images-provider';
import { Link, graphql, useStaticQuery } from "gatsby";

import './hero.css';
import { useWindowSize } from "../../functions/window-size";

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
    const window = useWindowSize();

    const txt_lg = `InMode's innovative technologies provide superior results for your patients.`;
    const txt_md = `Treatments for the face, body, skin and women's wellness.`;

    return (
        <div
            className="home-hero"
            style={{
                backgroundImage: `url(${images.get_one(window.width > 600 ? 'heroFull' : 'heroMini').publicURL})`
            }}
        >
            <div className="hero-right">
                <div className="hero-right-txt_lg user-select-none">{txt_lg}</div>
                <div className="hero-right-txt_md user-select-none">{txt_md}</div>
                <Link className="hero-right-button user-select-none" to="/morpheus8">
                    learn more
                </Link>
            </div>
        </div>
    );
};

interface Hero {

};

export default Hero;