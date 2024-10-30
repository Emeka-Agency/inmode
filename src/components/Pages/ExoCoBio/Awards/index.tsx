import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioAwards = ({  }:ExoCoBioAwards) => {

    const images = useImages();

    // ExoCoBioAward1
    // ExoCoBioAward2
    // ExoCoBioAward3
    // https://inmodeaustralia-my.sharepoint.com/personal/info_inmodeaustralia_onmicrosoft_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Finfo%5Finmodeaustralia%5Fonmicrosoft%5Fcom%2FDocuments%2FASCE%2B%20EXOSOMES%20BY%20INMODE%20QR%20CODE%2FCLINICAL&ga=1
    // https://inmodeaustralia-my.sharepoint.com/:f:/g/personal/info_inmodeaustralia_onmicrosoft_com/EluxhYzB2dVLge9STDOfJcEBjNje4r78L-EkVQ_W_AHGqg?e=6uS98K
    return (
        <div id="page_exocobio-awards">
            <h2>AWARDS</h2>
            <div id="page_exocobio-awards-list">
                <img src={images.resolve_img('ExoCoBioAward1')} srcSet={images.resolve_img_set('ExoCoBioAward1')}/>
                <img src={images.resolve_img('ExoCoBioAward2')} srcSet={images.resolve_img_set('ExoCoBioAward2')}/>
                <img src={images.resolve_img('ExoCoBioAward3')} srcSet={images.resolve_img_set('ExoCoBioAward3')}/>
            </div>
            <a id="page_exocobio-awards-publications" href="https://inmodeaustralia-my.sharepoint.com/:f:/g/personal/info_inmodeaustralia_onmicrosoft_com/EluxhYzB2dVLge9STDOfJcEBjNje4r78L-EkVQ_W_AHGqg?e=6uS98K" target="_blank">VOIR LES PUBLICATIONS</a>
        </div>
    );
};

interface ExoCoBioAwards {

};

export default ExoCoBioAwards;
