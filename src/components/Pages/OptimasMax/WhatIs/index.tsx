import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";
    
const prepare_str = (descr:string) => {
    return <div dangerouslySetInnerHTML={{ __html: descr
        .replace(/(\[P\])/g, '<p>').replace(/(\[\/P\])/g, '</p>')
        .replace(/(\[B\])/g, '<b>').replace(/(\[\/B\])/g, '</b>')
        .replace(/(\[I\])/g, '<i>').replace(/(\[\/I\])/g, '</i>')
        .replace(/(\[BR\])/g, '<br />')
        .replace(/(\[UL\])/g, '<ul>').replace(/(\[\/UL\])/g, '</ul>')
        .replace(/(\[OL\])/g, '<ol>').replace(/(\[\/OL\])/g, '</ol>')
        .replace(/(\[LI\])/g, '<li>').replace(/(\[\/LI\])/g, '</li>')
        .replace(/(\[H1\])/g, '<h1>').replace(/(\[\/H1\])/g, '</h1>')
        .replace(/(\[H2\])/g, '<h2>').replace(/(\[\/H2\])/g, '</h2>')
        .replace(/(\[H3\])/g, '<h3>').replace(/(\[\/H3\])/g, '</h3>')
        .replace(/(\[H4\])/g, '<h4>').replace(/(\[\/H4\])/g, '</h4>')
        .replace(/(\[H5\])/g, '<h5>').replace(/(\[\/H5\])/g, '</h5>')
        .replace(/(\[H6\])/g, '<h6>').replace(/(\[\/H6\])/g, '</h6>')
    }}></div>;
}

const dots = [
    "Approche multimodale : Contracter les tissus, améliorer l'aspect de la peau et répondre à toute une série de préoccupations.",
    "Polyvalence inégalée : Traitez un large éventail de problèmes esthétiques, notamment la contraction des tissus mous, les traitements par radiofréquence fractionnée, l'épilation laser et bien plus encore, le tout sur une seule plateforme.",
    "Contrôle amélioré : Des avancées technologiques pour un contrôle supérieur, une puissance accrue et des résultats plus rapides.",
    "Traitements personnalisables : Adapter les traitements pour répondre aux demandes individuelles des différents profils de patients, en offrant des traitements combinés pour des résultats inégalés.",
    "Conception ludique : Logiciel programmable, grand écran de traitement LCD et pièces à main ergonomiques pour une utilisation facile.",
];

// OptimasMaxLogo

const OptimasMaxWhatIs = ({}:OptimasMaxWhatIs) => {

    const images = useImages();

    return (
        <div id="page-optimas_max-whatis">
            <h2>Technologie de pointe, précision ultime, résultats exceptionnels.</h2>
            <h4>
                <p>Optimas Max est une plateforme multifonctionnelle qui permet de proposer les procédures esthétiques les plus demandées, notamment la radiofréquence (RF) fractionnée, la Lumière Intense Pulsée (IPL), l’épilation laser et les traitements vasculaires.</p>
                <p>Avec Optimas Max, vous disposez désormais d’un meilleur contrôle et d’une plus grande puissance technologique offrant des résultats plus rapides.</p>
                <p>Vous fournirez ainsi de meilleurs traitements et des résultats inégalés à vos patients, notamment en termes de <strong>remodelage du collagène</strong>, de <strong>rajeunissement cutané</strong>, de <strong>réduction des ridules et des rides</strong>, de <strong>traitement des lésions pigmentaires et vasculaires</strong> et d'<strong>épilation laser</strong></p>
            </h4>
            <div id="page-optimas_max-platform_image">
                <img src={images.resolve_img("OptimasMax__OptimasMAX4TechLeftSide")} srcSet={images.resolve_img_set("OptimasMax__OptimasMAX4TechLeftSide")}/>
            </div>
            <div id="page-optimas_max-whatis-section">
                <h2>LES AVANTAGES</h2>
                <div id="page-optimas_max-whatis-dots">
                    {dots.map((dot, i) => <div key={i} className="page-optimas_max-whatis-dot">
                        <img src={images.resolve_img('keyBenefitIconTeal')} srcSet={images.resolve_img_set('keyBenefitIconTeal')}/>
                        <span>{prepare_str(dot)}</span>
                    </div>)}
                </div>
            </div>
            <h4>Les modes BURST® et SCALE® sont disponibles sur les technologies Morpheus8 Burst et Morpheus8 Burst Deep, permettant une efficacité et une précision accrues.</h4>
        </div>
    );
};

interface OptimasMaxWhatIs {

};

export default OptimasMaxWhatIs;