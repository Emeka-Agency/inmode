import React from "react";
import { useImages } from '../contexts/images-provider';

const ClinicalStudies = ({}:ClinicalStudies) => {

    const images = useImages();

    return (
        <div
            className="clinical-studies-home background-image"
            style={{
                'backgroundImage': 'url(' + images.getOne('homeClinicalBack').publicURL + ')'
            }}
        >
            <div className="container">
                <div className="studies">
                    <h2 className="title">Clinical studies</h2>
                    <div className="content">
                        <img
                            src={images.getOne('homeClinicalStudy').childImageSharp.fluid.srcWebp}
                            srcSet={images.getOne('homeClinicalStudy').childImageSharp.fluid.srcSetWebp}
                            alt="studies-img"
                        />
                        <a href="https://inmodemd.com/clinical-papers/" target="_blank" rel="noreferrer" title="See the studies">
                            See studies
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