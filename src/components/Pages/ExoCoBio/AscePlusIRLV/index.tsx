import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioAscePlusIRLV = ({  }:ExoCoBioAscePlusIRLV) => {

    const images = useImages();

    return (
        <div id="page_exocobio-asce_irlv">
            <div id="page_exocobio-asce_irlv-irlv1">
                <div id="page_exocobio-asce_irlv1-bg">
                    <img src={images.resolve_img('ExoCobioIRLV1')} srcSet={images.resolve_img_set('ExoCobioIRLV1')} />
                </div>
                <div id="page_exocobio-asce_irlv1-text">
                    <h2>Le premier rajeunissement intime au monde</h2>
                    <div id="page_exocobio-asce_irlv-irlv1-band"></div>
                    <h3 style={{fontWeight: 'bold'}}>Prix AMWC 2024 de la meilleure médecine régénérative</h3>
                    <h4>ASCE Plus IRLV normalise l'environnement, reconstruit la barrière cutanée amincie, augmente la rétention d'eau, améliore la sécheresse et aide à restaurer la santé d'origine.</h4>
                </div>
            </div>
            <div id="page_exocobio-asce_irlv-irlv2">
                <div id="page_exocobio-asce_irlv2-bg">
                    <img src={images.resolve_img('ExoCobioIRLV2')} srcSet={images.resolve_img_set('ExoCobioIRLV2')} />
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioAscePlusIRLV {

};

export default ExoCoBioAscePlusIRLV;
