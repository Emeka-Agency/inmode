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
    "IgniteRF déploie de multiples modalités programmables qui agissent en synergie : [UL][LI]Quantum RF 25 : Radiofréquence fractionnée[/LI][LI]Quantum RF 10 : Radiofréquence fractionnée[/LI][LI]BodyTite Turbo : Liposuccion Assistée par Radiofréquence[/LI][LI]FaceTite Turbo : Liposuccion Assistée par Radiofréquence[/LI][LI]Morpheus8 Burst : Radiofréquence fractionnée à micro-aiguilles[/LI][LI]Morpheus8 Burst Deep : Radiofréquence fractionnée à micro-aiguilles[/LI][/UL]",
    "IgniteRF permet aux médecins de proposer une variété de procédures sécuritaires, précises et personnalisées.",
    "IgniteRF est munie de matériaux améliorés offrant une canule plus rigide pour garantir que la canule reste ferme lorsqu’elle cible des zones spécifiques du visage et du corps.",
    "Gamme complète avec des niveaux de profondeur de traitement, allant de 0,5 mm jusqu’à 50 mm.",
    "Les réglages prédéfinis de l’énergie RF contrôlent la dissipation thermique pour obtenir des résultats optimaux.",
    "La diffusion contrôlée et régulière de l’énergie RF permet de chauffer uniformément les grandes zones corporelles.",
    "La température est surveillée en temps réel grâce à une rétroaction effectuée à une fréquence de 1000 fois/seconde assurant ainsi un contrôle thermique immédiat et précis.",
    "Concentration de l’énergie à hauteur de 100% dans la zone de traitement, protégeant les nerfs et les structures périphériques.",
];

// IgniteRFLogo

const IgniteRFWhatIs = ({}:IgniteRFWhatIs) => {

    const images = useImages();

    return (
        <div id="page-igniterf-whatis">
            <h2>TECHNOLOGIE DE POINTE. PRÉCISION ULTIME. RÉSULTATS EXCEPTIONNELS</h2>
            <h4>IgniteRF est une plateforme de radiofréquence avancée qui offre des traitements mini-invasifs de remodelage du visage et du corps. IgniteRF tire parti de diverses modalités combinées de manière synergique pour accroître sa rapidité, son efficacité, sa précision et sa puissance afin d’obtenir les résultats optimaux.</h4>
            <div style={{height: 'auto', margin: '16px auto 32px'}}>
                <img src={images.resolve_img("IgniteRFWhatIsDisplay")} srcSet={images.resolve_img_set("IgniteRFWhatIsDisplay")} style={{height: 'auto', maxHeight: '384px'}}/>
            </div>
            <div id="page-igniterf-whatis-section">
                <div id="page-igniterf-whatis-dots">
                    {dots.map((dot, i) => <div key={i} className="page-igniterf-whatis-dot">
                        <img src={images.resolve_img('keyBenefitIgniteRF')} srcSet={images.resolve_img_set('keyBenefitIgniteRF')}/>
                        <span>{prepare_str(dot)}</span>
                    </div>)}
                </div>
                {/* <div id="page-igniterf-whatis-video">
                    <iframe src="https://www.youtube.com/embed/fZlN-d7-yV0?start=0&amp;end=0&amp;autoplay=0&amp;loop=0&amp;mute=0&amp;rel=1" title="IgniteRF par InMode - Redéfinir le soin oculaire" loading="lazy"> </iframe>
                </div> */}
            </div>
        </div>
    );
};

interface IgniteRFWhatIs {

};

export default IgniteRFWhatIs;