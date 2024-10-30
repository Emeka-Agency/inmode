import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioAscePlusSRLV = ({  }:ExoCoBioAscePlusSRLV) => {

    const images = useImages();

    return (
        <div id="page_exocobio-asce_srlv">
            <div id="page_exocobio-asce_srlv-srlv1">
                <div id="page_exocobio-asce_srlv1-bg">
                    <img src={images.resolve_img('ExoCobioSRLV1')} srcSet={images.resolve_img_set('ExoCobioSRLV1')} />
                </div>
                <div id="page_exocobio-asce_srlv1-text">
                    <h2>ESTHÉTIQUE RÉGÉNÉRATIVE DE NOUVELLE GÉNÉRATION</h2>
                    <h3>Poudre de 5 milliards d'exosomes lyophilisés - 20mg</h3>
                    <div id="page_exocobio-asce_srlv-srlv1-band"></div>
                </div>
            </div>
            <div id="page_exocobio-asce_srlv-srlv2">
                <div id="page_exocobio-asce_srlv2-bg">
                    <img src={images.resolve_img('ExoCobioSRLV2')} srcSet={images.resolve_img_set('ExoCobioSRLV2')} />
                </div>
            </div>
            <div id="page_exocobio-asce_srlv-triple_key">
                <h2>TRIPLES FACTEURS ET EFFETS CLÉS</h2>
                <div id="page-exocobio-asce_srlv-triple_key-elems">
                    <div id="page-exocobio-asce_srlv-triple_key-elem">
                        <span>PRDXs</span>
                        <span>Vieillissement inversé</span>
                    </div>
                    <div id="page-exocobio-asce_srlv-triple_key-elem">
                        <span>Let-7b</span>
                        <span>Anti-inflammation</span>
                    </div>
                    <div id="page-exocobio-asce_srlv-triple_key-elem">
                        <span>CD44</span>
                        <span>Absorption améliorée</span>
                    </div>
                </div>
            </div>
            <div id="page_exocobio-asce_srlv-srlv3">
                <div className="page_exocobio-asce_srlv-srlv3-elem">
                    <img src={images.resolve_img('ExoCobioSRLV3')} srcSet={images.resolve_img_set('ExoCobioSRLV3')} />
                </div>
                <div className="page_exocobio-asce_srlv-srlv3-elem">
                    <div className="page_exocobio-asce_srlv-srlv3-elem-top_txt">Augmentation du <span>collagène</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-bottom_txt">Jusqu'à <span>690%</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-arrow_up"></div>
                </div>
                <div className="page_exocobio-asce_srlv-srlv3-elem">
                    <div className="page_exocobio-asce_srlv-srlv3-elem-top_txt">Augmentation de l'<span>élastine</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-bottom_txt">Jusqu'à <span>300%</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-arrow_up"></div>
                </div>
                <div className="page_exocobio-asce_srlv-srlv3-elem">
                    <div className="page_exocobio-asce_srlv-srlv3-elem-top_txt">Réduction de la <span>mélanine</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-bottom_txt">Jusqu'à <span>75%</span></div>
                    <div className="page_exocobio-asce_srlv-srlv3-elem-arrow_down"></div>
                </div>
            </div>
            <div id="page_exocobio-asce_srlv-srlv4">
                <div id="page_exocobio-asce_srlv4-bg">
                    <img src={images.resolve_img('ExoCobioSRLV4')} srcSet={images.resolve_img_set('ExoCobioSRLV4')} />
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioAscePlusSRLV {

};

export default ExoCoBioAscePlusSRLV;
