import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";
import Addons from "../../../product/addons";
import { InmodePanel_Addon_Interface } from "../../../interfaces";

const OptimasMaxTechs = ({}:OptimasMaxTechs) => {

    const images = useImages();

    const OPTMAX_ID = 123456;

    const datas: {
        addons: InmodePanel_Addon_Interface[];
        id: number;
    } = {
        id: OPTMAX_ID,
        addons: [
            {
                id: 'optimas_max__morpheus8burst',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__Morpheus8Burst24PinTopAngled')},
                    title_image: {localFile: images.get_one('OptimasMax__Morpheus8BurstLogo_Final_Black')},
                    title_text: "Morpheus8 Burst",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme, Morpheus8 Burst est une technologie de radiofréquence fractionnée à micro-aiguilles gainées dont la pénétration et la puissance sont réglables pour le relissage du derme et le remodelage des tissus adipeux sous-cutanés du visage. Dotée des fonctionnalités exclusives Burst® et Scale®, ces modes innovants déploient automatiquement la radiofréquence bipolaire à des profondeurs de traitement multi-niveaux et à des niveaux d'énergie programmables par intervalles de quelques millisecondes, en une seule impulsion."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "Morpheus8 Burst", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__morpheus8burstdeep',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__Morpheus8BurstDeep_40Pin_Top_Angled')},
                    title_image: {localFile: images.get_one('OptimasMax__Morpheus8BurstDeep_Logo_2024')},
                    title_text: "Morpheus8 Burst Deep",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Technologie avancée de dernière génération et mini-invasive de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous, Morpheus8 Burst Deep est une technologie de radiofréquence fractionnée destinée aux applications dermatologiques qui nécessitent une contraction/coagulation des tissus mous ou une hémostase au niveau des zones corporelles. Capable d'effectuer une contraction sous-cutanée et dermique à plusieurs niveaux, Morpheus8 Burst Deep offre les niveaux les plus profonds de dépôt d'énergie RF ciblée disponibles sur le marché. Dotée des fonctionnalités exclusives Burst® et Scale®, l’embout à 40 micro-aiguilles de Morpheus8 Burst Deep déploie automatiquement l'énergie RF bipolaire, à intervalles de quelques millisecondes, à des profondeurs de traitement et à des niveaux d'énergie multi-niveaux en une seule impulsion."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "Morpheus8 Burst Deep", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__lumecca_peak',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__LumecaPeakLightOption_Faded')},
                    title_image: {localFile: images.get_one('OptimasMax__LumeccaPeak')},
                    title_text: "Lumecca Peak",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "La Lumière Intense Pulsée (IPL), conçue avec 25 % de puissance optique en plus et une durée d’impulsion plus courte, offre des résultats plus rapides pour traiter les lésions vasculaires et pigmentaires, les vaisseaux superficiels et les photodommages sur les peaux claires et foncées."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "Lumecca Peak", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__fusion_light_dark',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__Fusion_Light_Dark_Angled_Faded_Flipped')},
                    title_image: {localFile: images.get_one('OptimasMax__FusionLightFusionDarkLogo_Black')},
                    title_text: "Fusion Light / Fusion Dark",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Fusion Light et Fusion Dark fournissent les meilleures longueurs d’ondes de leur catégorie, 755 nm Alexandrite, 810 nm Diode et 1064 nm Nd:YAG, afin de répondre à la demande n°1 des patients dans le monde : l’épilation."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "Fusion Light / Fusion Dark", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__diolaxe_xl_max',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__Diolaze_XL_Max_Angled_Faded_Flipped')},
                    title_image: {localFile: images.get_one('OptimasMax__DiolazeXLMax_Black')},
                    title_text: "DiolazeXL Max",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "DiolazeXL Max est équipée d’un laser diode 810 nm pour des traitements d’épilation  rapides et très efficaces. Toutes les procédures sont confortables et indolores, même sur les poils épais et tenaces."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "DiolazeXL Max", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__vasculaze_max',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__VasculazeHPSideBlack_Faded')},
                    title_image: {localFile: images.get_one('OptimasMax__VasculazeMaxBlack')},
                    title_text: "Vasculaze Max",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Vasculaze Max est la solution pour traiter les lésions vasculaires, y compris les angiomes, les hémangiomes, les télangiectasies, les taches de vin, les veines des jambes et autres vascularités bénignes."
                        }
                    ],
                }],
                // MenuParams: {
                //     title: "Vasculaze Max", url: "", type: "text", variant: "content", internal_link: true,
                // },
                sensitivity: false,
            },
            {
                id: 'optimas_max__forma',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__PlusFormaAngledRight_Faded')},
                    title_image: {localFile: images.get_one('OptimasMax__TechnologyLogoFormaBlack')},
                    title_text: "Forma",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Forma est une technologie de remodelage de la peau offrant un chauffage dermique et sous-dermique. La radiofréquence passe par des électrodes pour offrir un traitement non-invasif et indolore. Des contrôles de température intégrés permettent au traitement d'atteindre les résultats optimaux de manière sûre et efficace."
                        }
                    ],
                }],
                MenuParams: {
                    title: "FORMA", url: "/technology/forma", type: "text", variant: "content", internal_link: true,
                },
                sensitivity: false,
            },
            {
                id: 'optimas_max__plus',
                ProductPresentation: [{
                    left_image: {localFile: images.get_one('OptimasMax__PlusFormaAngledRight_Faded')},
                    title_image: {localFile: images.get_one('OptimasMax__PlusLogoBlack')},
                    title_text: "Plus",
                    appears_everywhere: true,
                    Images: [],
                    AddonProductsDescr: [
                        {
                            product: {id: OPTMAX_ID},
                            descr: "Forma Plus utilise la technologie de radiofréquence afin d’obtenir une contraction optimale des couches profondes de la peau. L’énergie de la radiofréquence stimule la formation de collagène et améliore l’élasticité de la peau."
                        }
                    ],
                }],
                MenuParams: {
                    title: "PLUS", url: "/technology/plus", type: "text", variant: "content", internal_link: true,
                },
                sensitivity: false,
            },
        ]
    };

    return <Addons datas={datas} product_name="OptimasMax" sensible={false}/>
};

interface OptimasMaxTechs {

};

export default OptimasMaxTechs;