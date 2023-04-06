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
                localFile {
                    childImageSharp {
                        fluid {
                        srcWebp
                        srcSetWebp
                        }
                    }
                }
            }
            learn_icon {
                localFile {
                    childImageSharp {
                        fluid {
                        srcWebp
                        srcSetWebp
                        }
                    }
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
                <div className="know-more">
                    <span>More about:</span>
                </div>
                <div className="goals">
                    <img
                        src={resolveImg(datas.learn_icon)}
                        srcSet={resolveImgSet(datas.learn_icon)}
                        alt='about-us-learn'
                    />
                    <div className="texts">
                        {datas.learn_txts && datas.learn_txts.map((txt, key) => {
                            return (
                                <span key={key}>
                                    <div key={`${key}-title`} className="title">
                                        {txt.title}
                                    </div>
                                    <div key={`${key}-text`} className="text">
                                        {txt.text}
                                    </div>
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="values">
                    <div className="title">FUNDAMENTAL VALUES:</div>
                    {datas.learn_values && datas.learn_values.map((value, key) => {
                    return (
                        <div key={key} className="list-elem">
                            <img
                                src={images.resolve_img('keyBenefitIcon')}
                                alt={`elem-${key}`}
                                className="before-text"
                            />
                            <div className="text">{value.texte}</div>
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