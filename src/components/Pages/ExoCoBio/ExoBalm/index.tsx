import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioExoBalm = ({ }: ExoCoBioExoBalm) => {

    const images = useImages();

    return (
        <div id="page_exocobio-exo_balm">
            <div id="page_exocobio-exo_balm-balm1">
                <div id="page_exocobio-exo_balm-bg">
                    <img src={images.resolve_img('ExoCobioExoBalm1')} srcSet={images.resolve_img_set('ExoCobioExoBalm1')} />
                </div>
                <div id="page_exocobio-exo_balm-text">
                    <h2>BAUME POST-SOINS À BASE D’EXOSOMES</h2>
                    <div id="page_exocobio-exo_balm-balm1-band"></div>
                    <h4>Des exosomes et des hydratants intensifs pour optimiser les résultats du traitement et réduire l'inflammation et le temps d'arrêt.</h4>
                    <h4>Il apporte un confort ultime à la peau endommagée et régénère la barrière cutanée pour redonner à votre peau son état naturel, maximisant ainsi les effets cliniques de tous les traitements cutanés.</h4>
                    <h4>Effet spécifique pour tous les types de peau lyophilisé pour maintenir l'efficacité et l'efficience prouvées d'ASCEplus.</h4>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioExoBalm {

};

export default ExoCoBioExoBalm;
