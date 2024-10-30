import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioAscePlusGel = ({  }:ExoCoBioAscePlusGel) => {

    const images = useImages();

    return (
        <div id="page_exocobio-asce_gel">
            <div id="page_exocobio-asce_gel-asce_gel1">
                <div id="page_exocobio-asce_gel-bg">
                    <img src={images.resolve_img('ExoCobioAsceGelMini')} srcSet={images.resolve_img_set('ExoCobioAsceGelMini')} />
                </div>
                <div id="page_exocobio-asce_gel-text">
                    <h2>MASQUE GEL APAISANT ASCE PLUS</h2>
                    <div id="page_exocobio-asce_gel-asce_gel1-band"></div>
                    <h4>Notre puissant masque gel concentré hydratant est conçu pour calmer, apaiser, hydrater intensément et rééquilibrer la barrière d'hydratation de la peau au niveau cellulaire, tout en restaurant un teint plus jeune et radieux.</h4>
                    <hr id="page_exocobio-asce_gel-divider"/>
                    <h2>POURQUOI CHOISIR LE MASQUE DE GEL APAISANT À L'EXOSOME ?</h2>
                    <div id="page_exocobio-asce_gel-asce_gel1-band"></div>
                    <h4>Notre masque gel apaisant à l’exosome est une puissante essence hydratante conçue pour calmer, apaiser et hydrater la peau en profondeur. Ce gel concentré agit au niveau cellulaire pour rééquilibrer la barrière d'hydratation de la peau, aidant à restaurer un teint jeune et radieux.</h4>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioAscePlusGel {

};

export default ExoCoBioAscePlusGel;
