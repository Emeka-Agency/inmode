import { Link } from "gatsby";
import React from "react";
import { _log } from "../../functions/logger";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { useImages } from '../contexts/images-provider';

const Alveoles = ({}:Alveoles) => {

    const images = useImages();

    const hexs = [
        {
            'src': images.resolve_img('alveole1'),
            'src_set': images.resolve_img_set('alveole1'),
            'target': '_self',
            'text': 'Conferences',
            'link': '/events/conferences'
        },
        {
            'src': images.resolve_img('alveole2'),
            'src_set': images.resolve_img_set('alveole2'),
            'target': '_self',
            'text': 'Webinars',
            'link': '/events/webinars'
        },
        {
            'src': images.resolve_img('alveole3'),
            'src_set': images.resolve_img_set('alveole3'),
            'target': '_self',
            'text': 'Workshops',
            'link': '/events/workshops'
        },
        {
            'src': images.resolve_img('alveole4'),
            'src_set': images.resolve_img_set('alveole4'),
            'target': '_self',
            'text': 'Products',
            'link': '/workstation'
        },
        {
            'src': images.resolve_img('alveole5'),
            'src_set': images.resolve_img_set('alveole5'),
            'target': '_blank',
            'text': 'Before / After',
            'link': 'https://inmodemd.com/gallery/'
        }
    ];

    _log(hexs);

    return (
        <div className="alveoles">
            <div className="back-hex left">
                <img
                    src={images.resolve_img('backAlveole')}
                    srcSet={images.resolve_img('backAlveole')}
                    alt="back-left"
                />
            </div>
            <div className="back-hex right">
                <img
                    src={images.resolve_img('backAlveole')}
                    srcSet={images.resolve_img('backAlveole')}
                    alt="back-right"
                />
            </div>
            <div className="alveoles-container">
                {hexs.map((hex, key) => {
                    return (
                        <div key={key} className="alveole">
                            <img className="first" src={hex.src} srcSet={hex.src_set} alt={hex.text}/>
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