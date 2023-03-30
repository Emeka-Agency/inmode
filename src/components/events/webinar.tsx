import React from "react";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Event_Interface } from "../interfaces";

const Webinar = ({ event = undefined }:Webinar) => {

    if(event === undefined) {
        return <></>;
    }

    const images = useImages();
    
    return (
        <div className="eseminar">
            <div className="eseminar-card-tech-list">
                {["accutite", "facetite", "morpheus8"].join(', ')}
            </div>
            <div className="descr-part custom-scrollbar moz-scrollbar">
                <div className="title">
                    Educational Series – Dr. Sherrell Aston with EmbraceRF and Morpheus Prime
                </div>
                <div className="short_descr">
                    In this episode of the Surgical Educational Series, board-certified plastic surgeon Dr. Sherrell Aston will be performing an EmbraceRF with Morpheus8 Prime procedure on a female patient. Dr. Aston will share his expertise with the minimally invasive NeckTite/FaceTite/AccuTite radiofrequency device with the Morpheus8 RF-mediated microneedling handpiece, done under local anesthesia. The neck, jowls, nasolabial folds, eyelids and face will be treated in one session. Dr. Aston will also be narrating his procedure, reviewing candidate selection, and discussing treatment settings and techniques while taking addressing questions from audience viewers.
                </div>
            </div>
            <div className="img-part">
                <img
                    className="event-pic"
                    src={images.resolve_img('gatsbyAstronaut')}
                    srcSet={images.resolve_img('gatsbyAstronaut')}
                />
            </div>
        </div>
    );
};

interface Webinar {
    event: InmodePanel_Event_Interface | undefined;
}

export default Webinar;