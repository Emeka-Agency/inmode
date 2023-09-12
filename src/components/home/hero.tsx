import React from "react";
import { Link } from "gatsby";
import ReactSimplyCarousel, { ReactSimplyCarouselProps } from 'react-simply-carousel';

import { useImages } from '../contexts/images-provider';
import { graphql, useStaticQuery } from "gatsby";

import './hero.css';
import Carousel from "../Carousel";
import { FlickityOptions_Interface } from "../interfaces";

const Hero = ({}:Hero) => {

    const [datas] = React.useState(useStaticQuery(graphql`
        {
            strapiHeroHeader {
                TopText
                BottomText
            }
        }
    `).strapiHeroHeader);

    const [activeSlide, setActiveSlide]:[number, React.Dispatch<number>] = React.useState(0);

    const images = useImages();

    // TODO faire un bloc bleu border-radius bottom-right et un bloc down var(--teal), image en position absolute du hero

    const img_init_right = 3;

    // const size = useWindowSize();

    const [flickityOptions]:[FlickityOptions_Interface, React.Dispatch<any>] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });

    const [carousel_options]:[ReactSimplyCarouselProps] = React.useState({
        activeSlideIndex: activeSlide,
        activeSlideProps: {
          style: {
            background: "blue"
          }
        },
        autoplay: true,
        autoplayDelay: 0,
        autoplayDirection: 'horizontal',
        backwardBtnProps: {
          children: "",
          style: {
            display: "none",
          }
        },
        containerProps: {
          style: {
            width: "100%",
            justifyContent: "space-between",
            userSelect: "none"
          }
        },
        delay: 1500,
        disableNavIfAllVisible: true,
        disableNavIfEdgeActive: true,
        disableNavIfEdgeVisible: true,
        disableSwipeByMouse: true,
        disableSwipeByTouch: true,
        dotsNav: {
          show: false,
          itemBtnProps: {
            style: {
              display: "none",
            }
          },
          activeItemBtnProps: {
            style: {
              display: "none",
            }
          }
        },
        easing: "ease-in-out",
        forwardBtnProps: {
          children: "",
          style: {
            display: "none",
          }
        },
        hideNavIfAllVisible: true,
        itemsToShow: 1,
        onRequestChange: setActiveSlide,
        infinite: true,
        preventScrollOnSwipe: true,
        speed: 1000,
        swipeTreshold: 60,
    });

    return (
        <div
            className="home-hero"
        >
            {/* // TODO ajouter single content */}
            <div className="hero-global">
                <div className="hero-top">
                    <div className="before-top-text user-select-none">LOVE YOUR SKIN</div>
                    <div className="top-text user-select-none">{datas.TopText}</div>
                    <div className="hero-top-links">
                        <Link className="hero-top-link inmode-btn user-select-none" to="/contact">Contact</Link>
                        <Link className="hero-top-link inmode-btn user-select-none" to="/events">Évènements</Link>
                    </div>
                </div>
                <div className="hero-bottom">
                    {/* </>} */}
                    <div className="bottom-text user-select-none">{datas.BottomText}</div>
                </div>
                {/* IMAGE HERO */}
                <div id="hero-img">
                    <img
                        className="hero-img user-select-none"
                        src={images.resolve_img("hero1")}
                        srcSet={images.resolve_img_set("hero1")}
                        style={{
                            "right": img_init_right + 'vw',
                            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"
                        }}
                        alt="hero-right-img"
                    />
                </div>
            </div>
        </div>
    );
};

interface Hero {

};

export default Hero;