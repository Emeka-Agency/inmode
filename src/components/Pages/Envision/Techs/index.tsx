import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

// EnvisionFormaIMarine
// EnvisionLumecaaIMarine
// EnvisionMorpheusMarine
// EnvisionFormaIBack
// EnvisionFormaIZoom
// EnvisionLumeccaIBack
// EnvisionLumeccaIZoom
// EnvisionMorpheus8Back
// EnvisionMorpheus8Zoom

const techs = [
    {
        img_back: "EnvisionFormaIBack",
        img_zoom: "EnvisionFormaIZoom",
        alt_back: "FormaI back",
        alt_zoom: "FormaI zoom",
        img_title: "EnvisionFormaIMarine",
        text: `Forma-I est une technologie innovante de remodelage thermique conçue pour délivrer une énergie de radiofréquence bipolaire ciblée dans les petites zones oculaires délicates. Sa taille compacte permet d'atteindre des températures de traitement optimales allant jusqu'à 43°C, offrant ainsi un chauffage profond, confortable, précis et uniforme. Forma-I traite les symptômes de la sécheresse oculaire causée par le dysfonctionnement des glandes de Meibomius. Destinée à la zone périorbitaire et aux paupières supérieures et inférieures, cette technologie soulage l'inflammation des glandes de Meibomius et l'irritation oculaire.`
    },
    {
        img_back: "EnvisionLumeccaIBack",
        img_zoom: "EnvisionLumeccaIZoom",
        alt_back: "LumeccaI back",
        alt_zoom: "LumeccaI zoom",
        img_title: "EnvisionLumecaaIMarine",
        text: `Lumecca-I est un traitement efficace des lésions épidermiques pigmentées bénignes et des lésions vasculaires cutanées bénignes. Lumecca a été développée avec une lampe flash avancée au xénon, produisant 40 % de l'énergie totale de l'impulsion dans la gamme 500-600 nm. L'énergie de la lumière pulsée pénètre dans la peau et est sélectivement absorbée par les chromophores des lésions (mélanine ou hémoglobine). Lumecca-I utilise la photothermolyse pour traiter les états inflammatoires oculaires de manière confortable, précise et ciblée. L’IPL a été prouvée cliniquement pour avoir un effet positif sur la sécheresse oculaire causée par un Dysfonctionnement des Glandes de Meibomius (DGM).`
    },
    {
        img_back: "EnvisionMorpheus8Back",
        img_zoom: "EnvisionMorpheus8Zoom",
        alt_back: "Morpheus8 back",
        alt_zoom: "Morpheus8 zoom",
        img_title: "EnvisionMorpheusMarine",
        text: `Morpheus8 est une technologie de radiofréquence fractionnée mini-invasive, conçue pour remodeler les tissus. L'énergie RF est délivrée à plusieurs profondeurs de traitement par des réseaux bipolaires de micro-aiguilles et entraîne un réchauffement et une coagulation localisés des tissus. La coagulation fractionnée favorise le remodelage, tandis que le tissu non traité entre les électrodes favorise une cicatrisation plus rapide. Morpheus8 dispose d'une gamme interchangeable d'embouts, offrant aux médecins une solution pour le resurfaçage dermique et le remodelage adipeux sous-cutané.`
    }
];

const EnvisionTechs = ({}:EnvisionTechs) => {

    const images = useImages();

    return (
        <div id="page-envision-techs">
            <h2>TECHNOLOGIES ASSOCIÉES</h2>
            <div id="page-envision-techs-list">
                {techs.map((tech, index) => {
                    return (
                        <div key={index} className="page-envision-techs-card">
                            <div className="page-envision-techs-card-img">
                                <img className="img-back" src={images.resolve_img(tech.img_back)} alt={tech.alt_back}/>
                                <img className="img-zoom" src={images.resolve_img(tech.img_zoom)} alt={tech.alt_zoom}/>
                            </div>
                            <div className="page-envision-techs-card-title">
                                <img src={images.resolve_img(tech.img_title)} alt={tech.img_title}/>
                            </div>
                            <div className="page-envision-techs-card-text">
                                <p>{tech.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

interface EnvisionTechs {

};

export default EnvisionTechs;