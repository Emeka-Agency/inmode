import React from "react";
import Carousel from "../Carousel";
import { useImages } from '../contexts/images-provider';
import { FlickityOptions_Interface } from "../interfaces";

import "./why-inmode.css";

const WhyInmode = ({}:WhyInmode) => {

    const [flickityOptions]:[FlickityOptions_Interface, React.Dispatch<any>] = React.useState({
        initialIndex: 0,
        cellAlign: 'center',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 1,
        friction: 1,
        percentPosition: false,
        autoPlay: 5000,
        wrapAround: true,
        groupCells: 1,
        draggable: false,
        freeScroll: false,
        prevNextButtons: false,
        adaptiveHeight: true,
        imagesLoaded: true,
    });

    const texts = [
        [
            {
                color: "var(--midnight)",
                bg_color: "var(--pearl)",
                content: [
                {type: "title", value: "7 Patented Technologies Across 10 Product Families"}
                ]
            },
            {
                color: "var(--pearl)",
                bg_color: "var(--platinum)",
                content: [
                {type: "title", value: "60+ Peer-Reviewed Publications To-Date"}
                ]
            },
            {
                color: "var(--dusk)",
                bg_color: "var(--teal)",
                content: [
                {type: "title", value: "String & Experienced"},
                {type: "text", value: "Managemenet Team in the Medical Aesthetic Market"}
                ]
            }
        ],
        [
            {
                color: "var(--pearl)",
                bg_color: "var(--teal)",
                content: [
                {type: "title", value: "PIONEERED"},
                {type: "text", value: "Minimally Invasive Aesthetic Surgery"}
                ]
            },
            {
                color: "var(--midnight)",
                bg_color: "var(--pearl)",
                content: [
                {type: "title", value: "EXPERTS IN :"},
                {type: "text", value: "RF, IPL, LASER, Low Level Laser Therapy (LLLT) and Minimally Invasive and Ablative Technologies"}
                ]
            },
            {
                color: "var(--pearl)",
                bg_color: "var(--platinum)",
                content: [
                {type: "title", value: "WORLDWIDE"},
                {type: "text", value: "Regulatory approvals (TGA, CE, FDA)"}
                ]
            }
        ]
    ];

    return (
        <section className="why-inmode-home">
            <h2 className="why-inmode-title">WHY INMODE</h2>
            <Carousel
                id={`carousel-why-inmode-home`}
                options={flickityOptions}
                classList={'transition carousel-why-inmode'}
            >
                {texts.map((blocks, blocks_key) => 
                    <div className="why-blocks" key={blocks_key}>
                        {blocks.map((block, block_key) => 
                            <div
                                className="why-block" key={`${blocks_key}_${block_key}`}
                                style={{
                                    backgroundColor: block.bg_color,
                                    color: block.color,
                                }}
                            >
                                {block.content.map((content, content_key) => 
                                    <>
                                        {content.type == "title" && <h3 key={`${blocks_key}_${block_key}_${content_key}`}>{content.value}</h3>}
                                        {content.type == "text" && <p key={`${blocks_key}_${block_key}_${content_key}`}>{content.value}</p>}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Carousel>
        </section>
    );
};

interface WhyInmode {

};

export default WhyInmode;