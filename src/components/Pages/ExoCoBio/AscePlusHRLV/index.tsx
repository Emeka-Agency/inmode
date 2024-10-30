import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioAscePlusHRLV = ({  }:ExoCoBioAscePlusHRLV) => {

    const images = useImages();

    return (
        <div id="page_exocobio-asce_hrlv">
            <div id="page_exocobio-asce_hrlv-hrlv1">
                <div id="page_exocobio-asce_hrlv1-bg">
                    <img src={images.resolve_img('ExoCobioHRLV1')} srcSet={images.resolve_img_set('ExoCobioHRLV1')} />
                </div>
                <div id="page_exocobio-asce_hrlv1-text">
                    <h2>SOINS AVANCÉS DES CHEVEUX ET DU CUIR CHEVELU PAR EXOSOMES</h2>
                    <h3>Poudre de 10 milliards d'exosomes lyophilisés - 20mg</h3>
                    <div id="page_exocobio-asce_hrlv-hrlv1-band"></div>
                </div>
            </div>
            <div id="page_exocobio-asce_hrlv-specialty">
                <div id="page_exocobio-asce_hrlv-specialty-tl">Rend les cheveux visiblement plus doux, plus brillants et plus volumineux</div>
                <div id="page_exocobio-asce_hrlv-specialty-tr">Hydrate et nourrit le cuir chevelu</div>
                <div id="page_exocobio-asce_hrlv-specialty-mm"><div>Les spécificités HRLV</div></div>
                <div id="page_exocobio-asce_hrlv-specialty-bl">Favorise un cycle de croissance des cheveux sain</div>
                <div id="page_exocobio-asce_hrlv-specialty-br">Réduit sensiblement la chute des cheveux</div>
            </div>
            <div id="page_exocobio-asce_hrlv-hrlv2">
                <div id="page_exocobio-asce_hrlv2-bg">
                    <img src={images.resolve_img('ExoCobioHRLV2')} srcSet={images.resolve_img_set('ExoCobioHRLV2')} />
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioAscePlusHRLV {

};

export default ExoCoBioAscePlusHRLV;
