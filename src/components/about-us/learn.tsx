import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useImages } from '../contexts/images-provider';

import { InmodePanel_AboutUs_Interface } from '../interfaces';
import { resolveImg, resolveImgSet } from "../../functions/tools";

const Learn = ({ from = "" }:Learn) => {

    const images = useImages();

    const [datas]:[InmodePanel_AboutUs_Interface, React.Dispatch<InmodePanel_AboutUs_Interface>] = React.useState(useStaticQuery(graphql`
        {
            strapiAboutUs {
                learn_bg {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                }
                learn_icon {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                }
                learn_txts {
                    title
                    text
                }
                learn_values {
                    texte
                }
            }
        }
    `).strapiAboutUs);
    
    return (
        <div className={`learn${from ? ` ${from}` : ''}`}>
            <div className="container">
                <div className="know-more user-select-none">
                    <span>En savoir plus sur:</span>
                    <Link to="/workstation" className="inmode-btn" title="Machines">Machines</Link>
                    <Link to="/workstation" className="inmode-btn" title="Pièces à main">Pièces à main</Link>
                    <Link to="/events" className="inmode-btn" title="Événements">Événements</Link>
                </div>
                <div className="goals">
                    <div className="texts">
                        {datas.learn_txts && datas.learn_txts.map((txt, key) => {
                            return (
                                <span key={key}>
                                    <div key={`${key}-title`} className="title user-select-none">
                                        {txt.title}
                                    </div>
                                    <div key={`${key}-text`} className="text user-select-none">
                                        {txt.text}
                                    </div>
                                </span>
                            );
                        })}
                    </div>
                    <img
                        className="user-select-none"
                        src={resolveImg(datas.learn_icon)}
                        srcSet={resolveImgSet(datas.learn_icon)}
                        alt='about-us-learn'
                    />
                </div>
                <div className="values">
                    <div className="title user-select-none">NOS VALEURS FONDAMENTALES:</div>
                    {datas.learn_values && datas.learn_values.map((value, key) => {
                    return (
                        <div key={key} className="list-elem">
                            <img
                                src={images.resolve_img('keyBenefitIcon')}
                                alt={`elem-${key}`}
                                className="before-text user-select-none"
                            />
                            <div className="text user-select-none">{value.texte}</div>
                        </div>
                    );
                    })}
                </div>
            </div>
        </div>
    );
};

interface Learn {
    from?: string;
};

export default Learn;