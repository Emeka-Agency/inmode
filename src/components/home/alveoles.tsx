import { Link } from "gatsby";
import React from "react";
import { useImages } from '../contexts/images-provider';

const Alveoles = ({}:Alveoles) => {

    const images = useImages();

    const hexs = [
        {
            'image': images.getOne('alveole1').childImageSharp?.fluid,
            'target': '_self',
            'text': 'Congrès',
            'link': '/events/congress'
        },
        {
            'image': images.getOne('alveole2').childImageSharp?.fluid,
            'target': '_self',
            'text': 'Webinar',
            'link': '/events/webinars'
        },
        {
            'image': images.getOne('alveole3').childImageSharp?.fluid,
            'target': '_self',
            'text': 'Workshop',
            'link': '/events/workshops'
        },
        {
            'image': images.getOne('alveole4').childImageSharp?.fluid,
            'target': '_self',
            'text': 'Produits',
            'link': '/workstation'
        },
        {
            'image': images.getOne('alveole5').childImageSharp?.fluid,
            'target': '_blank',
            'text': 'Avant / Après',
            'link': 'https://inmodemd.com/gallery/'
        }
    ];

    return (
        <div className="alveoles">
            <div className="back-hex left">
                <img
                    src={images.getOne('backAlveole').publicURL}
                    alt="back-left"
                />
            </div>
            <div className="back-hex right">
                <img
                    src={images.getOne('backAlveole').publicURL}
                    alt="back-right"
                />
            </div>
            <div className="alveoles-container">
                {hexs.map((hex, key) => {
                    return (
                        <div key={key} className="alveole">
                            <img className="first" src={hex.image.srcWebp} srcSet={hex.image.srcSetWebp} alt={hex.text}/>
                            <div className="alveole-text">{hex.text}</div>
                            {hex.target === '_self' ?
                                <Link className="zone-link" to={hex.link} title={hex.text}></Link>
                                :
                                <a className="zone-link" target="_blank" href={hex.link} rel="noreferrer" title={hex.text}></a>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface Alveoles {

};

export default Alveoles;