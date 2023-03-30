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

    // TODO faire un bloc bleu border-radius bottom-right et un bloc down #59b7b3, image en position absolute du hero

    const img_init_right = 3;

    // const size = useWindowSize();

    return (
        <div
            className="home-hero"
            // onMouseMove={(e) => {
            //     let _w = size.innerWidth/2;
            //     let _h = size.innerHeight/2;
            //     let _mouseX = e.clientX;
            //     let _mouseY = e.clientY;
            //     document.getElementById('hero-img').style.right = `calc(${(_mouseX - _w) * 0.005}% + ${img_init_right}vw`;
            //     document.getElementById('hero-img').style.bottom = `${(_mouseY - _h) * 0.005}%`;
            // }}
        >
            {/* // TODO ajouter single content */}
            <div className="hero-global">
                <div className="hero-top">
                    <div className="top-text">{datas.TopText}</div>
                    {/* {size.width < 670 && <> */}
                    <div className="border-5"></div>
                    <div className="border-4"></div>
                    <div className="border-3"></div>
                    <div className="layout-2"></div>
                    <div className="layout-3"></div>
                    <div className="layout-4"></div>
                    <div className="layout-5"></div>
                    <div className="layout-6"></div>
                </div>
                <div className="hero-bottom">
                    {/* </>} */}
                    <div className="bottom-text">{datas.BottomText}</div>
                </div>
                {/* IMAGE HERO */}
                <img
                    id="hero-img"
                    src={images.resolve_img('heroHeader')}
                    srcSet={images.resolve_img('heroHeader')}
                    style={{"right": img_init_right + 'vw'}}
                    alt="hero-right-img"
                />
            </div>
        </div>
    );
};

interface Hero {

};

export default Hero;