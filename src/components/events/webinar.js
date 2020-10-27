import React from "react";
import { get_img_path } from "../../functions/get_images";

const Webinar = ({ event = {} }) => {

    console.log(event);
    
    return (
        <div className="eseminar">
            <div className="eseminar-card-tech-list">
                {["accutite", "facetite", "morpheus8"].join(', ')}
            </div>
            <div className="descr-part">
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
                    src={get_img_path("gatsby-astronaut.png")}
                />
            </div>
        </div>
    );
}

Webinar.propTypes = {

};

Webinar.defaultProps = {

};

export default Webinar;