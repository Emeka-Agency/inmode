import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioExosoms = ({  }:ExoCoBioExosoms) => {

    const images = useImages();

    return (
        <div id="page_exocobio-exosoms">
            <div id="page_exocobio-exosoms-explain">
                <div id="page_exocobio-exosoms-explain-what_are">
                    <h2>Qu’est-ce que les Exosomes :</h2>
                    <p>Les traitements par Exosomes avec les produits ASCE+ d’ExoCoBio sont fondés sur des percées biotechnologiques de pointe pour le rajeunissement et la régénération de la peau et du cuir chevelu. Nos exosomes, cliniquement prouvés et primés, sont des acteurs clés de la communication intercellulaire, facilitant l'échange d'ARN, de protéines, de facteurs de croissance, de cytokines et de matériel génétique entre différents types de cellules, notamment les fibroblastes, les kératinocytes et les cellules immunitaires. Cet échange est essentiel à la réparation des tissus et à l'amélioration des cellules de la peau.</p>
                </div>
                <div id="page_exocobio-exosoms-explain-gif">
                    <img src={images.resolve_img('ExoCoBioExosom')} srcSet={images.resolve_img_set('ExoCoBioExosom')} />
                </div>
                <div id="page_exocobio-exosoms-explain-sci_tech">
                    <h2>Science & Technologie :</h2>
                    <p>Pourquoi les exosomes ASCE+ ?</p>
                    <p>Grâce à la technologie novatrice d'isolement et de purification ExoSCRT™, qui surpasse les standards de l'industrie, les exosomes — des structures de 30 à 200 nm issues du réticulum endoplasmique, sécrétées pour assurer la communication intercellulaire — jouent un rôle crucial en influençant le microenvironnement cellulaire. ExoSCRT™ permet de séparer et purifier des exosomes à un taux de 0,1 % à partir de cellules souches, contribuant ainsi à revitaliser l'énergie naturelle de la peau en agissant efficacement sur les cellules cutanées.</p>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioExosoms {

};

export default ExoCoBioExosoms;
