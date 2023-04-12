import { Link } from "gatsby";
import React from "react";
import { _log } from "../../functions/logger";
import { useImages } from '../contexts/images-provider';
import InmodeHex from '../Hexagone';

import "./alveoles.css";

const Alveoles = ({}:Alveoles) => {

    const images = useImages();

    const hexs = [
        {
            'src': images.resolve_img('alveole3'),
            'src_set': images.resolve_img_set('alveole3'),
            'target': '_self',
            'text': 'our specialists',
            'subtext': 'Learn more about our innovative technologies and how to provide superior results for your patients',
            'link': '/our-specialists'
        },
        {
            'src': images.resolve_img('alveole5'),
            'src_set': images.resolve_img_set('alveole5'),
            'target': '_blank',
            'text': 'clinical studies',
            'subtext': 'Explore your non-invasive and minimally-invasive options in our Patients Portal, designed for patients and consumers.',
            'link': 'https://inmodemd.com/clinical-papers/'
        },
        {
            'src': images.resolve_img('alveole2'),
            'src_set': images.resolve_img_set('alveole2'),
            'target': '_blank',
            'text': 'before / after',
            'subtext': 'Explore the benefits and applications of our innovative technologies.',
            'link': 'https://inmodemd.com/gallery/'
        },
        {
            'src': images.resolve_img('alveole1'),
            'src_set': images.resolve_img_set('alveole1'),
            'target': '_self',
            'text': 'events',
            'subtext': 'InMode hosts seminars and attends conferences throughout the year, see our event schedule.',
            'link': '/events'
        }
    ];
    
    return (
        <div className="alveoles">
            <h2 className="title">innovate with inmode</h2>
            <div className="alveoles-container">
                {hexs.map((hex, key) => {
                    return (
                        <div key={key} className="alveole">
                            <img className="first" src={hex.src} srcSet={hex.src_set} alt={hex.text}/>
                            <div className="alveole-text inmode-btn-bottom">
                                <span className="text">{hex.text}</span>
                                {hex.target === '_self' ?
                                    <Link className="zone-link" to={hex.link} title={hex.text}></Link>
                                    :
                                    <a className="zone-link" target="_blank" href={hex.link} rel="noreferrer" title={hex.text}></a>
                                }
                            </div>
                            <div className="alveole-subtext">{hex.subtext}</div>
                        </div>
                    );
                })}
            </div>
            {/* <InmodeHex classes={["alveoles-hex"]} outer="teal" inner="transparent"/> */}
        </div>
    );
};

interface Alveoles {

};

export default Alveoles;