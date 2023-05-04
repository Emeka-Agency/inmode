import { Link } from "gatsby";
import React from "react";
import { useImages } from '../contexts/images-provider';

const Alveoles = ({}:Alveoles) => {

    const images = useImages();

    const hexs = [
        {
            // 'image': images.resolve_img('alveole1'),
            'image': images.resolve_img('new_alveole1'),
            'target': '_self',
            'text': 'Congrès',
            'link': '/events/congress'
        },
        {
            // 'image': images.resolve_img('alveole2'),
            'image': images.resolve_img('new_alveole2'),
            'target': '_self',
            'text': 'Webinar',
            'link': '/events/webinars'
        },
        {
            'image': images.resolve_img('alveole3'),
            'target': '_self',
            'text': 'Workshop',
            'link': '/events/workshops'
        },
        // {
        //     'image': images.resolve_img('alveole4'),
        //     'target': '_self',
        //     'text': 'Produits',
        //     'link': '/workstation'
        // },
        // {
        //     'image': images.resolve_img('alveole5'),
        //     'target': '_blank',
        //     'text': 'Avant / Après',
        //     'link': 'https://inmodemd.com/gallery/'
        // }
    ];

    return (
        <div className="alveoles">
            <div className="title">Évènements</div>
            {/* <div className="back-hex left">
                <img
                    src={images.resolve_img('backAlveole')}
                    alt="back-left"
                />
            </div> */}
            {/* <div className="back-hex right">
                <img
                    src={images.resolve_img('backAlveole')}
                    alt="back-right"
                />
            </div> */}
            <div className="alveoles-container">
                {hexs.map((hex, key) => {
                    return (
                        <div key={key} className="alveole">
                            <div
                                className="first"
                                style={{
                                    backgroundImage: `url(${hex.image})`,
                                    backgroundPositionY: "center"
                                }}
                            ></div>
                            <div className="alveole-text">{hex.text}</div>
                            {hex.target === '_self' ?
                                <Link className="absolute-link" to={hex.link} title={hex.text}></Link>
                                :
                                <a className="absolute-link" target="_blank" href={hex.link} rel="noreferrer" title={hex.text}></a>
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