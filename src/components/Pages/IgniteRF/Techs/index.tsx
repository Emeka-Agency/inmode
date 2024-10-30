import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";
import Addons from "../../../product/addons";
import { InmodePanel_Addon_Interface } from "../../../interfaces";

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
        img_back: "IgniteRFQuantumRF10Back",
        img_zoom: "IgniteRFQuantumRF10Zoom",
        alt_back: "QuantumRF10 back",
        alt_zoom: "QuantumRF10 zoom",
        // img_title: "IgniteRFQuantumRF10Marine",
        img_title: "IgniteRFQuantumRF10Title",
        text: `Technologie avancée de dernière génération mini-invasive, conçue pour la contraction des tissus mous. Elle utilise la radiofréquence fractionnée pour atteindre des profondeurs maximales dans des zones ciblées, grâce à une pièce à main petite et facile à manipuler. Cette dernière délivre une énergie RF bipolaire pulsée précise au niveau des tissus sous-cutanés, offrant des temps de récupération plus courts et des procédures plus sûres. Avec une canule de 10 cm et une puissance de pointe de 35W, QuantumRF 10 est particulièrement efficace dans le traitement des petites zones du corps.`
    },
    {
        img_back: "IgniteRFQuantumRF25Back",
        img_zoom: "IgniteRFQuantumRF25Zoom",
        alt_back: "QuantumRF25 back",
        alt_zoom: "QuantumRF25 zoom",
        // img_title: "IgniteRFQuantumRF25Marine",
        img_title: "IgniteRFQuantumRF25Title",
        text: `Technologie avancée de dernière génération mini-invasive, conçue pour la contraction des tissus mous. Elle utilise une radiofréquence fractionnée cliniquement prouvée pour atteindre des profondeurs maximales dans le derme. La pièce à main légère, revêtue de téflon, diffuse une radiofréquence bipolaire pulsée sur des zones plus étendues sans endommager la peau, rendant les procédures plus rapides et plus efficaces. Avec une canule de 25 cm et une puissance de pointe de 60W, QuantumRF 25 offre des performances supérieures dans le traitement des grandes surfaces.`
    },
    {
        img_back: "IgniteRFFaceTiteTurboBack",
        img_zoom: "IgniteRFFaceTiteTurboZoom",
        alt_back: "FaceTite Turbo back",
        alt_zoom: "FaceTite Turbo zoom",
        // img_title: "IgniteRFFaceTiteTurboMarine",
        img_title: "IgniteRFFaceTiteTurboTitle",
        text: `Technologie avancée de dernière génération et mini-invasive qui améliore nettement les petites zones tissulaires du visage et du corps, FaceTite Turbo améliore nettement les petites zones tissulaires du visage et du corps. Utilisant la technologie RFAL et un design avancé, FaceTite Turbo offre des résultats proches d'un lifting traditionnel, sans cicatrices majeures ni temps de récupération. Cette technologie mini-invasive, avec une canule rigide, assure un contrôle, une précision et une sécurité accrus dans les zones délicates.`
    },
    {
        img_back: "IgniteRFBodyTiteTurboBack",
        img_zoom: "IgniteRFBodyTiteTurboZoom",
        alt_back: "BodyTite Turbo back",
        alt_zoom: "BodyTite Turbo zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFBodyTiteTitle",
        text: `Technologie avancée de dernière génération et mini-invasive de remodelage corporel qui élimine la graisse tout en évitant le relâchement de la peau, BodyTite Turbo est une procédure innovante et mini-invasive de remodelage corporel qui élimine la graisse tout en évitant le relâchement de la peau. Utilisant la technologie de Lipolyse Assistée par Radiofréquence (RFAL) et un design de pointe, cette technologie garantit des résultats cliniques exceptionnels. Doté d'une canule plus rigide qui reste ferme lors du traitement, BodyTite Turbo bénéficie de 50% de puissance supplémentaire et d'une canule 40% plus longue, offrant ainsi une puissance accrue, une précision améliorée et des résultats plus rapides.`
    },
    {
        img_back: "IgniteRFMorpheus8BurstBack",
        img_zoom: "IgniteRFMorpheus8BurstZoom",
        alt_back: "Morpheus8 Burst back",
        alt_zoom: "Morpheus8 Burst zoom",
        // img_title: "IgniteRFMorpheus8BurstMarine",
        img_title: "IgniteRFMorpheus8BurstTitle",
        text: `Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme, Morpheus8 Burst est une technologie de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme et le remodelage des tissus adipeux sous-cutanés du visage. Dotée des fonctionnalités exclusives Burst® et Scale®, ces modes innovants déploient automatiquement la radiofréquence bipolaire à des profondeurs de traitement multi-niveaux et à des niveaux d'énergie programmables par intervalles de quelques millisecondes, en une seule impulsion.`
    },
    {
        img_back: "IgniteRFMorpheus8BurstDeepBack",
        img_zoom: "IgniteRFMorpheus8BurstDeepZoom",
        alt_back: "Morpheus8 Burst Deep back",
        alt_zoom: "Morpheus8 Burst Deep zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFMorpheus8BurstDeepTitle",
        text: `Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous, Morpheus8 Burst Deep est une technologie de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous ou une hémostase au niveau des zones corporelles. Capable d'effectuer une contraction sous-cutanée et dermique à plusieurs niveaux, Morpheus8 Burst Deep offre les niveaux les plus profonds de dépôt d'énergie RF ciblée disponibles sur le marché. Dotée des fonctionnalités exclusives Burst® et Scale®, l’embout à 40 micro-aiguilles de Morpheus8 Burst Deep déploie automatiquement l'énergie RF bipolaire, à intervalles de quelques millisecondes, à des profondeurs de traitement et à des niveaux d'énergie multi-niveaux en une seule impulsion.`
    },
    {
        img_back: "IgniteRFAccuTiteIgniteRFBack",
        img_zoom: "IgniteRFAccuTiteIgniteRFZoom",
        alt_back: "AccuTite IgniteRF back",
        alt_zoom: "AccuTite IgniteRF zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFAccuTiteIgniteRFTitle",
        text: `Technologie avancée et mini-invasive la plus petite de la gamme RFAL, conçue pour les interventions dermatologiques et chirurgicales générales nécessitant une contraction des tissus mous ou une hémostase, AccuTite IgniteRF est le plus petit dispositif RF mini-invasif de la gamme des technologies RFAL, conçu pour les interventions dermatologiques et chirurgicales générales nécessitant une contraction des tissus mous ou une hémostase. Cette technologie de pointe permet un remodelage précis des zones délicates du visage et du corps en toute sécurité, grâce aux diverses protections intégrées (coupure automatique de la température, mesure en temps réel de la température de la peau…).`,
    },
    {
        img_back: "IgniteRFFaceTiteIgniteRFBack",
        img_zoom: "IgniteRFFaceTiteIgniteRFZoom",
        alt_back: "FaceTite IgniteRF back",
        alt_zoom: "FaceTite IgniteRF zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFFaceTiteIgniteRFTitle",
        text: `Technologie avancée et mini-invasive pour le traitement de petites zones du corps, apportant des améliorations significatives au contour du visage et à d'autres zones délicates, FaceTite IgniteRF est une technologie avancée pour le traitement de petites zones du corps, apportant des améliorations significatives au contour du visage et à d'autres zones délicates. Exploitant la puissance RFAL, FaceTite IgniteRF se rapproche d'un lifting traditionnel sans les grandes cicatrices et les temps d'arrêt associés. Conçue avec une canule non-aspirante et dotée d'un embout en plastique, cette technologie permet aux médecins de travailler dans le plan sous-cutané de manière sûre et efficace.`,
    },
    {
        img_back: "IgniteRFBodyTiteIgniteRFBack",
        img_zoom: "IgniteRFBodyTiteIgniteRFZoom",
        alt_back: "BodyTite IgniteRF back",
        alt_zoom: "BodyTite IgniteRF zoom",
        // img_title: "IgniteRFMorpheusMarine",
        img_title: "IgniteRFBodyTiteIgniteRFTitle",
        text: `Technologie avancée et mini-invasive cliniquement prouvée, basée sur la Liposuccion Assistée par Radiofréquence (RFAL), BodyTite IgniteRF est une technologie mini-invasive cliniquement prouvée, basée sur la Liposuccion Assistée par Radiofréquence (RFAL), pour le traitement des larges zones corporelles. BodyTite IgniteRF réduit la graisse sans provoquer de relâchement cutané et permet en un seul traitement d'obtenir des résultats de contraction sans précédent, qui n'étaient auparavant obtenus que par des procédures chirurgicales plus lourdes.`,
    },
];

const IgniteRFTechs = ({}:IgniteRFTechs) => {

    const images = useImages();

    const IGRF_ID = 654321;

    const datas: {
        addons: InmodePanel_Addon_Interface[];
        id: number;
    } = {
        id: IGRF_ID,
        addons: [
            {
                id: 'igniterf__quantumrf10',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFQuantumRF10Zoom')},
                    title_image: {localFile: images.get_one('IgniteRFQuantumRF10Title')},
                    title_text: "QuantumRF 10",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération mini-invasive, conçue pour la contraction des tissus mous. Elle utilise la radiofréquence fractionnée pour atteindre des profondeurs maximales dans des zones ciblées, grâce à une pièce à main petite et facile à manipuler. Cette dernière délivre une énergie RF bipolaire pulsée précise au niveau des tissus sous-cutanés, offrant des temps de récupération plus courts et des procédures plus sûres. Avec une canule de 10 cm et une puissance de pointe de 35W, QuantumRF 10 est particulièrement efficace dans le traitement des petites zones du corps."}],
                }],
                MenuParams: {
                    title: "QuantumRF 10", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__quantumrf25',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFQuantumRF25Zoom')},
                    title_image: {localFile: images.get_one('IgniteRFQuantumRF25Title')},
                    title_text: "QuantumRF 25",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. M. Loffredo & Dr. S. Jones", image: {localFile: images.get_one("IgniteRFBeforeAfterLoffredo")}, alt: "Dr. M. Loffredo & Dr. S. Jones.jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération mini-invasive, conçue pour la contraction des tissus mous. Elle utilise une radiofréquence fractionnée cliniquement prouvée pour atteindre des profondeurs maximales dans le derme. La pièce à main légère, revêtue de téflon, diffuse une radiofréquence bipolaire pulsée sur des zones plus étendues sans endommager la peau, rendant les procédures plus rapides et plus efficaces. Avec une canule de 25 cm et une puissance de pointe de 60W, QuantumRF 25 offre des performances supérieures dans le traitement des grandes surfaces."}],
                }],
                MenuParams: {
                    title: "QuantumRF 25", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__facetiteturbo',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFFaceTiteTurboZoom')},
                    title_image: {localFile: images.get_one('IgniteRFFaceTiteTurboTitle')},
                    title_text: "FaceTite Turbo",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. R. Diepenbrock (Facetite + M8)", image: {localFile: images.get_one("IgniteRFBeforeAfterDiepenbrock")}, alt: "Dr. R. Diepenbrock (Facetite + M8).jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération et mini-invasive qui améliore nettement les petites zones tissulaires du visage et du corps, FaceTite Turbo améliore nettement les petites zones tissulaires du visage et du corps. Utilisant la technologie RFAL et un design avancé, FaceTite Turbo offre des résultats proches d'un lifting traditionnel, sans cicatrices majeures ni temps de récupération. Cette technologie mini-invasive, avec une canule rigide, assure un contrôle, une précision et une sécurité accrus dans les zones délicates."}],
                }],
                MenuParams: {
                    title: "FaceTite Turbo", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__bodytiteturbo',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFBodyTiteTurboZoom')},
                    title_image: {localFile: images.get_one('IgniteRFBodyTiteTitle')},
                    title_text: "BodyTite Turbo",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. P. Hester", image: {localFile: images.get_one("IgniteRFBeforeAfterHester")}, alt: "Dr. P. Hester.jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération et mini-invasive de remodelage corporel qui élimine la graisse tout en évitant le relâchement de la peau, BodyTite Turbo est une procédure innovante et mini-invasive de remodelage corporel qui élimine la graisse tout en évitant le relâchement de la peau. Utilisant la technologie de Lipolyse Assistée par Radiofréquence (RFAL) et un design de pointe, cette technologie garantit des résultats cliniques exceptionnels. Doté d'une canule plus rigide qui reste ferme lors du traitement, BodyTite Turbo bénéficie de 50% de puissance supplémentaire et d'une canule 40% plus longue, offrant ainsi une puissance accrue, une précision améliorée et des résultats plus rapides."}],
                }],
                MenuParams: {
                    title: "BodyTite Turbo", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__morpheus8burst',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFMorpheus8BurstZoom')},
                    title_image: {localFile: images.get_one('IgniteRFMorpheus8BurstTitle')},
                    title_text: "Morpheus8 Burst",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme, Morpheus8 Burst est une technologie de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme et le remodelage des tissus adipeux sous-cutanés du visage. Dotée des fonctionnalités exclusives Burst® et Scale®, ces modes innovants déploient automatiquement la radiofréquence bipolaire à des profondeurs de traitement multi-niveaux et à des niveaux d'énergie programmables par intervalles de quelques millisecondes, en une seule impulsion."}],
                }],
                MenuParams: {
                    title: "Morpheus8 Burst", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__morpheus8burstdeep',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFMorpheus8BurstDeepZoom')},
                    title_image: {localFile: images.get_one('IgniteRFMorpheus8BurstDeepTitle')},
                    title_text: "Morpheus8 Burst Deep",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Diamond Aesthetics (M8 Burst Deep)", image: {localFile: images.get_one("IgniteRFBeforeAfterDiamond")}, alt: "Diamond Aesthetics (M8 Burst Deep).jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous, Morpheus8 Burst Deep est une technologie de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous ou une hémostase au niveau des zones corporelles. Capable d'effectuer une contraction sous-cutanée et dermique à plusieurs niveaux, Morpheus8 Burst Deep offre les niveaux les plus profonds de dépôt d'énergie RF ciblée disponibles sur le marché. Dotée des fonctionnalités exclusives Burst® et Scale®, l’embout à 40 micro-aiguilles de Morpheus8 Burst Deep déploie automatiquement l'énergie RF bipolaire, à intervalles de quelques millisecondes, à des profondeurs de traitement et à des niveaux d'énergie multi-niveaux en une seule impulsion."}],
                }],
                MenuParams: {
                    title: "Morpheus8 Burst Deep", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__accutiteigniterf',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFAccuTiteIgniteRFZoom')},
                    title_image: {localFile: images.get_one('IgniteRFAccuTiteIgniteRFTitle')},
                    title_text: "AccuTite",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. M. Clifton (Accutite + M8)", image: {localFile: images.get_one("IgniteRFBeforeAfterClifton")}, alt: "Dr. M. Clifton (Accutite + M8).png"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée et mini-invasive la plus petite de la gamme RFAL, conçue pour les interventions dermatologiques et chirurgicales générales nécessitant une contraction des tissus mous ou une hémostase, AccuTite IgniteRF est le plus petit dispositif RF mini-invasif de la gamme des technologies RFAL, conçu pour les interventions dermatologiques et chirurgicales générales nécessitant une contraction des tissus mous ou une hémostase. Cette technologie de pointe permet un remodelage précis des zones délicates du visage et du corps en toute sécurité, grâce aux diverses protections intégrées (coupure automatique de la température, mesure en temps réel de la température de la peau…).`"}],
                }],
                MenuParams: {
                    title: "AccuTite", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__facetiteigniterf',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFFaceTiteIgniteRFZoom')},
                    title_image: {localFile: images.get_one('IgniteRFFaceTiteIgniteRFTitle')},
                    title_text: "FaceTite",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. Z. Willis (Facetite)", image: {localFile: images.get_one("IgniteRFBeforeAfterWillis")}, alt: "Dr. Z. Willis (Facetite).jpg"},
                        {product: {id: IGRF_ID}, doctor: "Dr. M. Tarajki (Facetite)", image: {localFile: images.get_one("IgniteRFBeforeAfterTarajki")}, alt: "Dr. M. Tarajki (Facetite).jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée et mini-invasive pour le traitement de petites zones du corps, apportant des améliorations significatives au contour du visage et à d'autres zones délicates, FaceTite IgniteRF est une technologie avancée pour le traitement de petites zones du corps, apportant des améliorations significatives au contour du visage et à d'autres zones délicates. Exploitant la puissance RFAL, FaceTite IgniteRF se rapproche d'un lifting traditionnel sans les grandes cicatrices et les temps d'arrêt associés. Conçue avec une canule non-aspirante et dotée d'un embout en plastique, cette technologie permet aux médecins de travailler dans le plan sous-cutané de manière sûre et efficace.`"}],
                }],
                MenuParams: {
                    title: "FaceTite", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'igniterf__bodytiteigniterf',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('IgniteRFBodyTiteIgniteRFZoom')},
                    title_image: {localFile: images.get_one('IgniteRFBodyTiteIgniteRFTitle')},
                    title_text: "BodyTite",
                    appears_everywhere: true,
                    Images: [
                        {product: {id: IGRF_ID}, doctor: "Dr. J. Raniere (Bodytite)", image: {localFile: images.get_one("IgniteRFBeforeAfterRaniere")}, alt: "Dr. J. Raniere (Bodytite).jpg"},
                        {product: {id: IGRF_ID}, doctor: "Dr. R. Malhotra (BodyTite)", image: {localFile: images.get_one("IgniteRFBeforeAfterMalhotra")}, alt: "Dr. R. Malhotra (BodyTite).jpg"}
                    ],
                    AddonProductsDescr: [{product: {id: IGRF_ID}, descr: "Technologie avancée et mini-invasive cliniquement prouvée, basée sur la Liposuccion Assistée par Radiofréquence (RFAL), BodyTite IgniteRF est une technologie mini-invasive cliniquement prouvée, basée sur la Liposuccion Assistée par Radiofréquence (RFAL), pour le traitement des larges zones corporelles. BodyTite IgniteRF réduit la graisse sans provoquer de relâchement cutané et permet en un seul traitement d'obtenir des résultats de contraction sans précédent, qui n'étaient auparavant obtenus que par des procédures chirurgicales plus lourdes.`"}],
                }],
                MenuParams: {
                    title: "BodyTite", url: "#", type: "", variant: "", internal_link: true,
                },
                sensitivity: false,
            },
        ]
    };

    return <Addons datas={datas} product_name="IgniteRF" sensible={false}/>

    // return (
    //     <div id="page-igniterf-techs">
    //         <h2>TECHNOLOGIES ASSOCIÉES</h2>
    //         <div id="page-igniterf-techs-list">
    //             {techs.map((tech, index) => {
    //                 return (
    //                     <div key={index} className="page-igniterf-techs-card">
    //                         <div className="page-igniterf-techs-card-img">
    //                             <img className="img-back" src={images.resolve_img(tech.img_back)} alt={tech.alt_back}/>
    //                             <img className="img-zoom" src={images.resolve_img(tech.img_zoom)} alt={tech.alt_zoom}/>
    //                         </div>
    //                         <div className="page-igniterf-techs-card-text">
    //                             <div className="page-igniterf-techs-card-title">
    //                                 {tech.img_title.startsWith('/text/') ? <span>{tech.img_title.replace('/text/', '')}</span> : <img src={images.resolve_img(tech.img_title)} alt={tech.img_title}/>}
    //                             </div>
    //                             <div className="page-igniterf-techs-card-descr">
    //                                 <p>{tech.text}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // );
};

interface IgniteRFTechs {

};

export default IgniteRFTechs;