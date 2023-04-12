import React from "react";
import { useImages } from '../contexts/images-provider';
import Video from "../Video";

import "./why-inmode.css";
import InmodeHex from "../Hexagone";

const WhyInmode = ({}:WhyInmode) => {

    const texts = [
        "Worldwide provider of innovative RF medical technologies, EMS, IPL Laser in the aesthetic and wellness industry.",
        "Pioneered medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.",
        "60+ Peer Reviewed Publications to Date."
    ];
    
    const images = useImages();
    
    return (
        <section className="why-inmode-home">
            {/* <InmodeHex classes={["why-inmode-hex"]} outer="platinum" inner="pearl"/> */}
            <h2 className="why-inmode-title">why choose inmode</h2>
            <div className="why_inmode-args">
                <div className="why_inmode-args-txts">
                    {texts.map(txt => (
                        <div className="why_inmode-args-txts-arg">
                            <img className="why_inmode-args-txts-arg-puce" src={images.resolve_img('keyBenefitIcon')}/>
                            <div className="why_inmode-args-txts-arg-txt">{txt}</div>
                        </div>
                    ))}
                </div>
                <div className="why_inmode-args-video">
                    <Video
                        video={{
                            url: "https://inmodemd.co.uk/public/assets/videos/InModeCorpVideo_Q32022.mp4",
                            poster: images.resolve_img('whyInmodePoster2'),
                            poster_link: "external",
                            poster_ratio: images.get_ratio('whyInmodePoster2')
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

interface WhyInmode {

};

export default WhyInmode;