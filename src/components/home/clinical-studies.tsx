import React from "react";
import { useImages } from '../contexts/images-provider';

const ClinicalStudies = ({}:ClinicalStudies) => {

    const images = useImages();

    return (
        <div
            className="clinical-studies-home background-image"
            style={{
                'backgroundImage': 'url(' + images.get_one('homeClinicalBack2')?.publicURL + ')'
            }}
        >
            <div className="container">
                <div className="studies">
                    <h2 className="title">Études cliniques</h2>
                    <div className="content">
                        <img
                            src={images.resolve_img('homeClinicalStudy')}
                            srcSet={images.resolve_img('homeClinicalStudy')}
                            alt="studies-img"
                        />
                        <a href="https://inmodemd.com/clinical-papers/" target="_blank" rel="noreferrer" title="Voir les études">
                            Voir les études
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ClinicalStudies {

};

export default ClinicalStudies;