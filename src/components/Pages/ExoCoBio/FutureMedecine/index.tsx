import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const ExoCoBioFutureMedecine = ({  }:ExoCoBioFutureMedecine) => {
    const images = useImages();

    return (
        <div id="page_exocobio-future_medecine">
            <h2>L'AVENIR DE LA MEDECINE REGENERATIVE</h2>
            <div className="page_exocobio-future_medecine-lig">
                <div className="page_exocobio-future_medecine-lig-elem">
                    <img src={images.resolve_img('ExoCoBioMore1')} srcSet={images.resolve_img_set('ExoCoBioMore1')}></img>
                    <AnchorLink to="#page_exocobio-asce_srlv">EN SAVOIR PLUS</AnchorLink>
                </div>
                <div className="page_exocobio-future_medecine-lig-elem">
                    <img src={images.resolve_img('ExoCoBioMore2')} srcSet={images.resolve_img_set('ExoCoBioMore2')}></img>
                    <AnchorLink to="#page_exocobio-asce_hrlv">EN SAVOIR PLUS</AnchorLink>
                </div>
                <div className="page_exocobio-future_medecine-lig-elem">
                    <img src={images.resolve_img('ExoCoBioMore3')} srcSet={images.resolve_img_set('ExoCoBioMore3')}></img>
                    <AnchorLink to="#page_exocobio-asce_irlv">EN SAVOIR PLUS</AnchorLink>
                </div>
            </div>
            <div className="page_exocobio-future_medecine-lig">
                <div className="page_exocobio-future_medecine-lig-elem">
                    <img src={images.resolve_img('ExoCoBioMore4')} srcSet={images.resolve_img_set('ExoCoBioMore4')}></img>
                    <AnchorLink to="#page_exocobio-exo_balm">EN SAVOIR PLUS</AnchorLink>
                </div>
                <div className="page_exocobio-future_medecine-lig-elem">
                    <img src={images.resolve_img('ExoCoBioMore5')} srcSet={images.resolve_img_set('ExoCoBioMore5')}></img>
                    <AnchorLink to="#page_exocobio-asce_gel">EN SAVOIR PLUS</AnchorLink>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioFutureMedecine {

};

export default ExoCoBioFutureMedecine;
