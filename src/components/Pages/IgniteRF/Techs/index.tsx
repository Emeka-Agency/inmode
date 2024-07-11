import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

// IgniteRFQuantumRF25Back
// IgniteRFQuantumRF25Zoom
// IgniteRFQuantumRF25Title
// IgniteRFQuantumRF10Back
// IgniteRFQuantumRF10Zoom
// IgniteRFQuantumRF10Title
// IgniteRFBodyTiteTurboBack
// IgniteRFBodyTiteTurboZoom
// IgniteRFMorpheusTitle
// IgniteRFFaceTiteTurboBack
// IgniteRFFaceTiteTurboZoom
// IgniteRFFaceTiteTurboTitle
// IgniteRFMorpheus8BurstBack
// IgniteRFMorpheus8BurstZoom
// IgniteRFMorpheus8BurstTitle
// IgniteRFMorpheus8BurstDeepBack
// IgniteRFMorpheus8BurstDeepZoom
// IgniteRFMorpheus8BurstDeepTitle

const techs = [
    {
        img_back: "IgniteRFQuantumRF25Back",
        img_zoom: "IgniteRFQuantumRF25Zoom",
        alt_back: "QuantumRF25 back",
        alt_zoom: "QuantumRF25 zoom",
        // img_title: "IgniteRFQuantumRF25Marine",
        img_title: "IgniteRFQuantumRF25Title",
        text: `Technologie avancée qui diffuse la radio-fréquence fractionnée (RF) dans le derme grâce à une canule de 25cm de long délivrant une puissance de pointe de 60W.`
    },
    {
        img_back: "IgniteRFQuantumRF10Back",
        img_zoom: "IgniteRFQuantumRF10Zoom",
        alt_back: "QuantumRF10 back",
        alt_zoom: "QuantumRF10 zoom",
        // img_title: "IgniteRFQuantumRF10Marine",
        img_title: "IgniteRFQuantumRF10Title",
        text: `Technologie innovante qui délivre la radio-fréquence fractionnée (RF) dans les petites zones du corps, grâce à une canule de 10cm de long délivrant une puissance de pointe de 35W.`
    },
    {
        img_back: "IgniteRFBodyTiteTurboBack",
        img_zoom: "IgniteRFBodyTiteTurboZoom",
        alt_back: "BodyTiteTurbo back",
        alt_zoom: "BodyTiteTurbo zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFBodyTiteTitle",
        text: `BodyTite Turbo est une procédure mini-invasive avancée de remodelage et d'affinement du corps. La technologie BodyTite Turbo réduit la graisse sans provoquer de relâchement cutané. En exploitant la Lipolyse Assistée par Radiofréquence (RFAL) et grâce à sa conception avancée, cette technologie offre des résultats cliniques inégalés.`
    },
    {
        img_back: "IgniteRFFaceTiteTurboBack",
        img_zoom: "IgniteRFFaceTiteTurboZoom",
        alt_back: "FaceTiteTurbo back",
        alt_zoom: "FaceTiteTurbo zoom",
        // img_title: "IgniteRFFaceTiteTurboMarine",
        img_title: "IgniteRFFaceTiteTurboTitle",
        text: `FaceTite Turbo peut apporter des améliorations significatives au petites zones tissulaires délicates du visage et du corps. Grâce à l’utilisation de la technologie RFAL et à sa conception avancée, FaceTite Turbo est ce qui se rapproche le plus d'un lifting traditionnel, sans les grandes cicatrices et les temps d'arrêt associés.`
    },
    {
        img_back: "IgniteRFMorpheus8BurstBack",
        img_zoom: "IgniteRFMorpheus8BurstZoom",
        alt_back: "Morpheus8Burst back",
        alt_zoom: "Morpheus8Burst zoom",
        // img_title: "IgniteRFMorpheus8BurstMarine",
        img_title: "IgniteRFMorpheus8BurstTitle",
        text: `Morpheus8 est une technologie de radiofréquence fractionnée à micro-aiguilles gainées dotée des fonctionnalités Burst et Scale, dont la pénétration et la puissance sont réglables pour le relissage du derme et le remodelage des tissus adipeux sous cutanés du visage et du corps.`
    },
    {
        img_back: "IgniteRFMorpheus8BurstDeepBack",
        img_zoom: "IgniteRFMorpheus8BurstDeepZoom",
        alt_back: "Morpheus8BurstDeep back",
        alt_zoom: "Morpheus8BurstDeep zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFMorpheus8BurstDeepTitle",
        text: `Morpheus8 est une technologie de radiofréquence fractionnée à micro-aiguilles gainées dotée des fonctionnalités Burst et Scale, dont la pénétration et la puissance sont réglables pour le relissage du derme et le remodelage des tissus adipeux sous cutanés du corps.`
    }
];

const IgniteRFTechs = ({}:IgniteRFTechs) => {

    const images = useImages();

    return (
        <div id="page-igniterf-techs">
            <h2>TECHNOLOGIES ASSOCIÉES</h2>
            <div id="page-igniterf-techs-list">
                {techs.map((tech, index) => {
                    return (
                        <div key={index} className="page-igniterf-techs-card">
                            <div className="page-igniterf-techs-card-img">
                                <img className="img-back" src={images.resolve_img(tech.img_back)} alt={tech.alt_back}/>
                                <img className="img-zoom" src={images.resolve_img(tech.img_zoom)} alt={tech.alt_zoom}/>
                            </div>
                            <div className="page-igniterf-techs-card-text">
                                <div className="page-igniterf-techs-card-title">
                                    <img src={images.resolve_img(tech.img_title)} alt={tech.img_title}/>
                                </div>
                                <div className="page-igniterf-techs-card-descr">
                                    <p>{tech.text}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

interface IgniteRFTechs {

};

export default IgniteRFTechs;