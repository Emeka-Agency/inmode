import React from "react";
import { useImages } from '../contexts/images-provider';

const ClinicalStudies = () => {

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
                    <h2 className="title">Études cliniques</h2>
                    <div className="content">
                        <img
                            src={images.getOne('homeClinicalStudy').childImageSharp.fluid.srcWebp}
                            srcSet={images.getOne('homeClinicalStudy').childImageSharp.fluid.srcSetWebp}
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

ClinicalStudies.propTypes = {

};

ClinicalStudies.defaultProps = {

};

export default ClinicalStudies;