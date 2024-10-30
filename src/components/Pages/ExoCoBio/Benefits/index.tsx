import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioBenefits = ({  }:ExoCoBioBenefits) => {

    const images = useImages();

    return (
        <div id="page_exocobio-benefits">
            <img src={images.resolve_img('ExoCoBioBenefitsBg')} srcSet={images.resolve_img_set('ExoCoBioBenefitsBg')}/>
            <h2>LES AVANTAGES DU TRAITEMENT</h2>
            <div id="page_exocobio-benefits-texts">
                <div id="page_exocobio-benefits-text">
                    <h3 id="page_exocobio-benefits-text-titre">La peau</h3>
                    <ul id="page_exocobio-benefits-text-list">
                        <li>Améliore la texture et l'aspect de la peau</li>
                        <li>Augmente la production de collagène et d'élastine</li>
                        <li>Favorise efficacement la cicatrisation des plaies</li>
                        <li>Effet anti-inflammatoire élevé</li>
                        <li>Réduction marquée de la mélanine</li>
                        <li>Régénère et rajeunit la peau saine</li>
                    </ul>
                </div>
                <hr id="page_exocobio-benefits-divider" />
                <div id="page_exocobio-benefits-text">
                    <h3 id="page_exocobio-benefits-text-titre">Le cuir chevelu</h3>
                    <ul id="page_exocobio-benefits-text-list">
                        <li>Une solution capillaire haut de gamme pour le traitement du cuir chevelu</li>
                        <li>Rend les cheveux visiblement plus doux, plus brillants et plus volumineux</li>
                        <li>Hydrate et nourrit le cuir chevelu</li>
                        <li>Favorise un cycle de croissance des cheveux sains</li>
                        <li>Réduit sensiblement la chute des cheveux</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioBenefits {

};

export default ExoCoBioBenefits;
