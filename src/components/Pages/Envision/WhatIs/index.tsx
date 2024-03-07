import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

const dots = [
    "Envision est la nouvelle technologie qui révolutionne les procédures de soins oculaires pour le traitement du dysfonctionnement des glandes de Meibomius (MGD) et des symptômes de la sécheresse oculaire (DED).",
    "Ce dispositif ophtalmique non chirurgical révolutionnaire déploie de multiples modalités programmables qui fonctionnent en synergie pour fournir des traitements oculaires de précision.",
    "Les applicateurs de radiofréquence bipolaire (RF) et de Lumière Intense Pulsée (IPL) de petite taille d'Envision, avec un contrôle précis de la profondeur de traitement, permettent des procédures très efficaces dans les petites couches sous-dermiques plus délicates de la région périorbitaire.",
    "La technologie de microneedling par radiofréquence fractionnée Morpheus8 Prime permet de retendre les paupières tombantes."
];

// EnvisionLogo

const EnvisionWhatIs = ({}:EnvisionWhatIs) => {

    const images = useImages();

    return (
        <div id="page-envision-whatis">
            <h2>L'ALTERNATIVE NON CHIRURGICALE D'INMODE QUI RÉVOLUTIONNE LES TRAITEMENTS OCULAIRES</h2>
            <h4>Envision offre des traitements non médicamenteux<br/>pour améliorer la vision et la qualité de vie de vos patients !</h4>
            <div id="page-envision-whatis-section">
                <div id="page-envision-whatis-dots">
                    {dots.map((dot, i) => <div key={i} className="page-envision-whatis-dot">
                        <img src={images.resolve_img('keyBenefitIconTeal')} srcSet={images.resolve_img_set('keyBenefitIconTeal')}/>
                        <span>{dot}</span>
                    </div>)}
                </div>
                <div id="page-envision-whatis-video">
                    <iframe src="https://www.youtube.com/embed/fZlN-d7-yV0?start=0&amp;end=0&amp;autoplay=0&amp;loop=0&amp;mute=0&amp;rel=1" title="Envision par InMode - Redéfinir le soin oculaire" loading="lazy"> </iframe>
                </div>
            </div>
        </div>
    );
};

interface EnvisionWhatIs {

};

export default EnvisionWhatIs;