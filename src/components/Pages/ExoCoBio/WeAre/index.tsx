import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioWeAre = ({  }:ExoCoBioWeAre) => {

    const images = useImages();

    return (
        <div id="page_exocobio-we_are" style={{backgroundImage: `url(${images.resolve_img('ExoCoBioWeAreBg2')})`}}>
            <div id="page_exocobio-we_are-text">
                <h2>QUI SOMMES-NOUS</h2>
                <p>Exploiter la puissance des exosomes lyophilisés dérivés des cellules STEM pour en faire des facteurs de croissance, des peptides, des coenzymes, des minéraux, des acides aminés et des vitamines.</p>
                <p>InMode France et ExoCoBio, une société cosmétique et biopharmaceutique de premier plan basée en Corée, ont uni leurs forces pour introduire des solutions d'exosomes de pointe sur les marchés français. ExoCoBio est un leader reconnu dans le domaine de la recherche, du développement et de la fabrication d'exosomes. Dédiée à l'avancement de la médecine régénérative et des sciences de la vie, elle a acquis une reconnaissance internationale pour ses produits d'exosomes de pointe. Cette collaboration marque une étape importante dans l'industrie des soins de santé et de l'esthétique.</p>
            </div>
            <div id="page_exocobio-we_are-img">
                <img src={images.resolve_img('ExoCoBioWeAreImg')} srcSet={images.resolve_img_set('ExoCoBioWeAreImg')} />
            </div>
        </div>
    );
};

interface ExoCoBioWeAre {

};

export default ExoCoBioWeAre;
